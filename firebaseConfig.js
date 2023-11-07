import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxyMuR07Lb5ijh9polrH9EjG2hvWzItzA",
    authDomain: "mobcomassignmentapp.firebaseapp.com",
    projectId: "mobcomassignmentapp",
    storageBucket: "mobcomassignmentapp.appspot.com",
    messagingSenderId: "500231688238",
    appId: "1:500231688238:web:9110b4bda31103d58a4fbf",
    measurementId: "G-YRFF7EWV04"
};
  
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export {
    FIREBASE_APP,
    FIREBASE_DB
}