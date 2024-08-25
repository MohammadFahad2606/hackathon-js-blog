import {
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
  auth,
} from "./firebas.js";
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "./auth/dashboard/dashboard.html";
  }
});
