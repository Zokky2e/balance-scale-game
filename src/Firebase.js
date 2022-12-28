// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn7FIH2u3kRa3_5YdCXnO5D242hL9ki44",
  authDomain: "balance-scale-game.firebaseapp.com",
  projectId: "balance-scale-game",
  storageBucket: "balance-scale-game.appspot.com",
  messagingSenderId: "105813236337",
  appId: "1:105813236337:web:b587952e469e6e602d19d0",
  measurementId: "G-QNBYJD8T5N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
