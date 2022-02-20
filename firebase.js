// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"
import { getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc, updateDoc
 } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUqBLfZAqCQ6hXsbbHQBYAXysLlQQFgNw",
  authDomain: "fir-jscrud-e26f0.firebaseapp.com",
  projectId: "fir-jscrud-e26f0",
  storageBucket: "fir-jscrud-e26f0.appspot.com",
  messagingSenderId: "357712479387",
  appId: "1:357712479387:web:f20d82b70daf2eede0b23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) =>{
 
  addDoc(collection(db, 'tasks'),{title, description})

} 

export const getTasks = () =>getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback )

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id))

export const getTask = id => getDoc(doc(db, 'tasks', id))


export const updateTask = ( id, newFilds) => updateDoc(doc(db, 'tasks', id), newFilds)