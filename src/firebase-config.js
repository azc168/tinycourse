import { initializeApp } from 'firebase/app';
import { getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvCusofACOhiEY2MhjoGMACaOOyq0AAfc",
  authDomain: "tinycourse-f6e2c.firebaseapp.com",
  databaseURL: "https://tinycourse-f6e2c-default-rtdb.firebaseio.com",
  projectId: "tinycourse-f6e2c",
  storageBucket: "tinycourse-f6e2c.appspot.com",
  messagingSenderId: "134207837664",
  appId: "1:134207837664:web:b3fc0ec7378155517dc785",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Setting up Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Create a reference to your Firebase Realtime Database
export const db = getFirestore(app);

