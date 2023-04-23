// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV5XImLptgRcApb9YJNhnNcdgtrGfRyxA",
  authDomain: "hlblogging.firebaseapp.com",
  projectId: "hlblogging",
  storageBucket: "hlblogging.appspot.com",
  messagingSenderId: "783931861338",
  appId: "1:783931861338:web:9129f0011353c13f2bab63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
