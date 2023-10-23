// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAJ4eTqegKfxuecnpe2wqsu9COOOz1pk2w",
  authDomain: "thesis-bme-cufflessbp.firebaseapp.com",
  databaseURL: "https://thesis-bme-cufflessbp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thesis-bme-cufflessbp",
  storageBucket: "thesis-bme-cufflessbp.appspot.com",
  messagingSenderId: "470536904317",
  appId: "1:470536904317:web:b2fbb2117f716d0e31db14"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);