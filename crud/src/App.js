import React, {useState, useEffect} from 'react'  //hook de estado sirve para almacenar datos y poder modificarlos, useEffect sirve para cuando la pagina cargue
import { isEmpty, size } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument  } from './actions' //>aqui se importan los metodos del archivo actions  //ANT import shortid from 'shortid'

function App() {  
  const [task, setTask] = useState("") //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)  
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => { //useEffect es un metodo asincrono
    (async () => { // aqui se llama una accion para que traiga la data 
    const result = await getCollection("tasks") //se guardar el resultado en una variable const ,se llama al metodo getCollection del archivo actions.js que se encarga de pintar la data, que recibe como parametro ("tasks") el nombre de la coleccion en firebase 
    if (result.statusResponse) {
      setTasks(result.data) //=> las tareas vaser igual al resultado que alla obtenido //ATN console.log(result) para probar que resuelve el resultado 
    }
    })() //el doble parentesis es un metodo asincrono auto ejecutable
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("Debes ingresar una tarea.")
    isValid = false
    }
  
    return isValid
  }
    
  const addTask = async(e) => {
    e.preventDefault()
    
    if (!validForm()) {
      return
      }

    const result = await addDocument("tasks", { name: task }) //> adicionando tarea a la coleccion de tasks  
    if (!result.statusResponse) {
      setError(result.error)
      return
      }

      setTasks([ ...tasks, { id: result.data.id, name: task } ]) //> se llama a base de datos y se almacena en memoria
      setTask("")
  }

  const saveTask = async(e) => {
    e.preventDefault()
  
    if (!validForm()) {
      return
      }

      const result = await updateDocument("tasks", id, { name: task }) //> existen metododos normales y los async await //>updateDocument metodo del archivo actions.js ,("tasks", id, { name: task }) actualiza la tarea
      if (!result.statusResponse) { //> !result niega la condicion 
        setError(result.error) //> entonce pinta el error que devuelva el api
        return
      }

    const editedTasks = tasks.map(item => item.id === id ? { id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = async(id) => {
    const result = await deleteDocument("tasks", id) //> tasks indica de cual coleccion va eliminar con el ID que se le pase por parametro 
  if (!result.statusResponse) { //> sino lo pudo borrar 
    setError( result.error) //> entonces pintar el error que esta en result.error
    return
  }

    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
    }
 
    const editTask = (theTask) => {
      setTask(theTask.name)
      setEditMode(true)
      setId(theTask.id)
      }

 return (
    <div className="container mt-5" >
    <h1> TAREAS </h1>
      <hr/> 
      <div className="row" >
        <div className="col-8" >
          <h4 className="text-center"> lista de tareas </h4>
      {
        size(tasks) === 0 ? (
          <li className="list-group-item">Aun no hay tareas programadas.</li>
        ) : (
            <ul className="list-group"> 
           {
              tasks.map((task) => ( 
            <li className="list-group-item" key={task.id}>
              <span className="lead">{task.name}</span>
              <button
               className="btn btn-danger btn-sm float-right mx-2"
               onClick={() => deleteTask(task.id)}
               >
                Eliminar
              </button>
              <button
               className="btn btn-warning btn-sm float-right"
               onClick={() => editTask(task)}
              >
                Editar
              </button>
            </li>
                ))
            }
          </ul>
        )

       }
        </div>
        <div className="col-4">
          <h4 className="text-center">
          { editMode ? "Modificar Tarea" : "Agregar Tarea" }
          </h4>
          <form onSubmit={ editMode ? saveTask : addTask }>
          {
          error && <span className="text-danger">{error}</span>
          }
        <input
        type="text"
        className="form-control mb-2"
        placeholder="Ingrese la tarea..."
        onChange={(text)=>setTask(text.target.value)}
        value={task}
        />
      <button
        className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
        type="submit"
      >
        { editMode ? "Guardar" : "Agregar" }
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;