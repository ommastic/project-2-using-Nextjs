// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARrthFuyNsg3-F7iwpqqsT8FDUdr3tNdY",
  authDomain: "summarist-app-2c993.firebaseapp.com",
  projectId: "summarist-app-2c993",
  storageBucket: "summarist-app-2c993.firebasestorage.app",
  messagingSenderId: "602005765949",
  appId: "1:602005765949:web:737e48ce57c31ba33d0f54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

