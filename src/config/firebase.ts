// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZ2-rLS6aHRUBajMRa6nAUvh9gGwlCJUo",
    authDomain: "ecommerce-app-7dcf4.firebaseapp.com",
    projectId: "ecommerce-app-7dcf4",
    storageBucket: "ecommerce-app-7dcf4.appspot.com",
    messagingSenderId: "96108691468",
    appId: "1:96108691468:web:71ea4d9e5477e5a863ee29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)