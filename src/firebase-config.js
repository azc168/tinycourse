import { initializeApp } from 'firebase/app';
import { getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_ni6cH1zwQCIbwNQZ1cfO4yRihkQP6q8",
  authDomain: "testbug-f9629.firebaseapp.com",
  projectId: "testbug-f9629",
  storageBucket: "testbug-f9629.appspot.com",
  messagingSenderId: "816310107616",
  appId: "1:816310107616:web:e24f29a9836f9683197f85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Setting up Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Create a reference to your Firebase Realtime Database
export const db = getFirestore(app);

