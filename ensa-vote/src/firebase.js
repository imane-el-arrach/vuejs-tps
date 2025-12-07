
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnnnoh0GcOO_EzPHVfYGvdWqL4mKXdA9Y",
  authDomain: "ensa-vote-6db18.firebaseapp.com",
  projectId: "ensa-vote-6db18",
  storageBucket: "ensa-vote-6db18.firebasestorage.app",
  messagingSenderId: "331812584200",
  appId: "1:331812584200:web:d9b139309848d3cdf1cabd"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function onUserStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}
