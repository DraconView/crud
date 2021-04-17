import firebase from 'firebase/app' 
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_NfqB9UkompzjjZ7IzjE4lrmkK1z44wc",
    authDomain: "crud-c7959.firebaseapp.com",
    projectId: "crud-c7959",
    storageBucket: "crud-c7959.appspot.com",
    messagingSenderId: "513289523243",
    appId: "1:513289523243:web:0dc0a8ccc4ae2ed9029a6e"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)