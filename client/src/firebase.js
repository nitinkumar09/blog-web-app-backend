// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-6300b.firebaseapp.com",
    projectId: "mern-blog-6300b",
    storageBucket: "mern-blog-6300b.appspot.com",
    messagingSenderId: "181078042470",
    appId: "1:181078042470:web:ba7d0628c01a84c3fd8aa7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);