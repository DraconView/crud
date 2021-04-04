import React, {useState} from 'react'
 //hook de estado sirve para almacenar datos y poder modificarlos
import { isEmpty } from 'lodash'

function App() {  
  const [task, setTask] = useState("")
 //este useState va tener 3 valores (task es el nombre, setTask se va llamar el motodo que modofica, va iniciar en null)  

   const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
    console.log("Task empty")
    return
    }
    console.log("Ok")
    setTask("")
  }
 
 return (
    <div className="container mt-5" >
    <h1> TAREAS </h1>
      <hr/> 
      <div className="row" >
      <div className="col-8" >
        <h4 className="text-center"> lista de tareas </h4>
        <ul className="list-group"> 
        <li className="list-group-item">
          <span className="lead">Nombre de la tarea</span>
          <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
          <button className="btn btn-warning btn-sm float-right">Editar</button>
        </li>
        </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">Formulario</h4>
        <form onSubmit={addTask}>
      <input
      type="text"
      className="form-control mb-2"
      placeholder="Ingrese la tarea..."
      onChange={(text)=>setTask(text.target.value)}
      value={task}
      />
      <button
      className="btn btn-dark btn-block"
      type="submit"
      >
        AGREGAR
      </button>
      </form>
      </div>
    </div>
    </div>
  );
}

export default App;
