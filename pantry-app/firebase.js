// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { api_Key } from "./credentials";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: api_Key,
  authDomain: "hs-pantry-app-944ce.firebaseapp.com",
  projectId: "hs-pantry-app-944ce",
  storageBucket: "hs-pantry-app-944ce.appspot.com",
  messagingSenderId: "388175314271",
  appId: "1:388175314271:web:52a18be4d6856af635caea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore}