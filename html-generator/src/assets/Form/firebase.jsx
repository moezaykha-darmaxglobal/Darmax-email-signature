// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBp0zeW2lZWwQhGfRJJbPigXHATod00klo",
  authDomain: "email-template-generator-1ebab.firebaseapp.com",
  projectId: "email-template-generator-1ebab",
  storageBucket: "email-template-generator-1ebab.appspot.com",
  messagingSenderId: "723623578765",
  appId: "1:723623578765:web:83e0554e10589327cf26c4",
  measurementId: "G-85RV93JGJN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



