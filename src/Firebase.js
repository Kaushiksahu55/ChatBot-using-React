// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZd2UEZN_6fSRddKhvrMGYcaQvDiX2cBg",
  authDomain: "authentication-module-59acf.firebaseapp.com",
  projectId: "authentication-module-59acf",
  storageBucket: "authentication-module-59acf.appspot.com",
  messagingSenderId: "157885730707",
  appId: "1:157885730707:web:3033c41864af5c03a4e266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app , auth}