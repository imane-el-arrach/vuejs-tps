import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB4mILx3zQlGvMffgBahg_jwVqNr03Oak0",
  authDomain: "ensa-forum-14ae2.firebaseapp.com",
  projectId: "ensa-forum-14ae2",
  storageBucket: "ensa-forum-14ae2.firebasestorage.app",
  messagingSenderId: "1065714844320",
  appId: "1:1065714844320:web:8db72a0a7f57cd5653ffc5"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export function onUserStateChanged(cb) {
  return onAuthStateChanged(auth, cb)
}

