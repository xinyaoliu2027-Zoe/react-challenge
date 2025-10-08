// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsdl1izaBiOMtx19RE_hLdoHswOUuVP44",
  authDomain: "react-challenge-xinyao.firebaseapp.com",
  databaseURL: "https://react-challenge-xinyao-default-rtdb.firebaseio.com",
  projectId: "react-challenge-xinyao",
  storageBucket: "react-challenge-xinyao.firebasestorage.app",
  messagingSenderId: "986289003088",
  appId: "1:986289003088:web:e2cf877777d73bfac18f55",
  measurementId: "G-JS35JRZEYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };