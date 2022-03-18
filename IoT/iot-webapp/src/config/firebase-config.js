// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxmpcLlUepJMCTPL_xjkLMtpcq2Y3pvDo",
  authDomain: "iot-webapp-28f3a.firebaseapp.com",
  projectId: "iot-webapp-28f3a",
  storageBucket: "iot-webapp-28f3a.appspot.com",
  messagingSenderId: "339993406396",
  appId: "1:339993406396:web:9acd79264e1f8d4a4219b9",
  measurementId: "G-0KR3ZVKG0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);