import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCMTmpj0WNEs-fvHKDVY1Krfuag0E9cL4Q",
  authDomain: "femtro-rides.firebaseapp.com",
  projectId: "femtro-rides",
  storageBucket: "femtro-rides.firebasestorage.app",
  messagingSenderId: "234292533399",
  appId: "1:234292533399:web:a9c3033a176209851f31d2",
  measurementId: "G-RVQWQ389S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
