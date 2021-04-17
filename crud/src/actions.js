import { firebaseApp } from './firebase' //se importa lo que se exporta del otro archivo
import firebase from 'firebase' //importar todas las operaciones de una libreria firebase. me toco eliminar * as despues del import para que compilara 
import 'firebase/firestore' //para que nos de acceso a las colecciones 
//require('firebase/firestore')
const db = firebase.firestore(firebaseApp) //para poder acceder a la base de datos se crea una constante
//se va crear un metodo generico que nos permite optener toda la coleccion de datos 
export const getCollection = async(collection) => { //se exportara una constante para que de todos los documento de una coleccion, async=>metodo asincono, que va recibir por parametro (collection) la coleccion que se quiere obtener ejemplo task2 task3
    const result = { statusResponse : false, data: null, error: null } //const result constante que es un objeto, se va obtener una data pero como todavia no hay datos se define con null, se agrega un objeto error como todavia no se a recibido el error se define con null 
    try { // cuando se va hacer la consulta a la base de tados se marcar con try cash por si fallara
        const data = await db.collection(collection).get() //si todo sale bien se obtendra la data, se creara una coleccion que se llama data que va se = a espere, db.collection se le dice a la base de datos hay una coleccion (collection) y la get solicita
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()})) //arrayData variable que adentro tiene un array que se llama .docs dentro de este se va mapiar .map para decirle que es un documento, (doc => ({ id: doc.id, ...doc.data()})) por cada documento haga un console.log para que se mas facil de visualizar 
        result.statusResponse = true //aqui se le dice que el resultado
        result.data = arrayData
    } catch (error) { //en try cash si falla va dar (error)
    result.error = error //result.error va ser igual al error que devuelva el metodo osea lo que se obtiene por catch
    }
    return result //result va retonar el resultado al finalizar el metodo  
}

export const addDocument = async(collection, data) => { //>metodo asincrono adiciona una coleccion, recibe por parametro una coleccion y data
    const result = { statusResponse : false, data: null, error: null }
    try { //=> try por si hay errores
        const response = await db.collection(collection).add(data) //> variable respose va ser igual a await que espere a nuestra DB base de datos en una coleccion que se llama colection en donde tiene el metodo add y que adicione esta nueva (data)
        result.data = { id: response.id } //> result.data devuelva como data un id que esta en reponse.id
        result.statusResponse = true //> va ser igual a true
    } catch (error) {
        result.error = error //> si hay errores result.error va ser igual al error que devuelva la base de datos 
    }
    return result
}

export const getDocument = async(collection, id) => { //> este metodo nos permite traer un solo documento, pasara por parametro una coleccion 
    const result = { statusResponse : false, data: null, error: null }
    try {
        const response = await db.collection(collection).doc(id).get() //> devuelve una respuesta en formato de .doc documento 
        result.data = { id: response.id, ...response.data() } //> los ... significa expread oparator 
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
        return result
    }

    export const updateDocument = async(collection, id, data) => { 
    const result = { statusResponse : false, error: null }
    try {
        await db.collection(collection).doc(id).update (data) //> update actualiza 
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
        return result
    }

    export const deleteDocument = async(collection, id) => { //> metodo para eliminar   
        const result = { statusResponse : false, error: null }
        try {
            await db.collection(collection).doc(id).delete() //> linea que exactamente hace la eliminacion 
            result.statusResponse = true
        } catch (error) {
            result.error = error
        }
        return result
    }


//    const data = await db.collection(collection).get() //si todo sale bien se obtendra la data, se creara una coleccion que se llama data que va se = a espere, db.collection se le dice a la base de datos hay una coleccion (collection) y la get solicita
//    console.log(data) //de momento se crea un console para poder probar que data devuelve la coleccion de objetos y que pinte en consola el resultado (data)
//    } catch (error) { //en try cash si falla va dar (error)
//    result.error = error //result.error va ser igual al error que devuelva el metodo osea lo que se obtiene por catch
//    }
//    return result //result va retonar el resultado al finalizar el metodo  
//}
