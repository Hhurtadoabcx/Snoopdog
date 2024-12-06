// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZqBS1LvTN1GzcjejneuTO_3n--ag4OdY",
  authDomain: "snoop-dog-1d325.firebaseapp.com",
  projectId: "snoop-dog-1d325",
  storageBucket: "snoop-dog-1d325.firebasestorage.app",
  messagingSenderId: "632211997513",
  appId: "1:632211997513:web:51fd4b8cb6aa7422d8d098",
  measurementId: "G-E6GQV4EG3G"
};

// Initialize Firebase
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const firestore = getFirestore(app);
// const storage = getStorage(app);

export { app, auth, firestore /*, storage */ };