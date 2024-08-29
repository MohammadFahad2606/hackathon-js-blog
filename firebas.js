import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
  getDocs,
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getDownloadURL ,
  uploadBytesResumable,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcWX82gwejJhy0uguFgDQgRWJtByJo0F4",
  authDomain: "blog-website-smit.firebaseapp.com",
  projectId: "blog-website-smit",
  storageBucket: "blog-website-smit.appspot.com",
  messagingSenderId: "1033006687150",
  appId: "1:1033006687150:web:581896e38534ee6ada9e3f",
  measurementId: "G-GVDK15V7H7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  uploadBytesResumable,
  getDownloadURL ,
  storage,
  ref,
  uploadBytes,
  createUserWithEmailAndPassword,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  auth,
  GoogleAuthProvider,
};
