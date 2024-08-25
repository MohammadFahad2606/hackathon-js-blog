import {
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
  db,
  onAuthStateChanged,
  signOut,
  auth,
} from "../../firebas.js";

let logoutBtn = document.querySelector("#logoutBtn");
let addBtn = document.querySelector("#addBtn");
let input = document.querySelector(".input");
let inputTittle = document.querySelector("#input ");
let textarea = document.querySelector("#textarea");
let addDataBtn = document.querySelector("#addDataBtn");

const addData = () => {
  
  console.log(inputTittle);


};







const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "../login/login.html";
    })
    .catch((error) => {
      alert(error);
    });
};

const add = () => {
  input.style.display = "block";
};

addDataBtn.addEventListener("click", addData);
logoutBtn.addEventListener("click", logout);
addBtn.addEventListener("click", add);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login/login.html";
  }
});
