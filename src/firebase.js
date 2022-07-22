// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHGmoroseG0jSRYjZytJ-iqg3tqefHwKE",
  authDomain: "foodfotos-a4b6e.firebaseapp.com",
  projectId: "foodfotos-a4b6e",
  storageBucket: "foodfotos-a4b6e.appspot.com",
  messagingSenderId: "895075174810",
  appId: "1:895075174810:web:aadea4bb2ae73ea7b79223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;