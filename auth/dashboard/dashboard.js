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
let tableDataRow = document.querySelector("#tableDataRow");
let loderWrapper = document.querySelector("#loader");

const addData = async () => {


  addDataBtn.innerText = "ADD........"
  try {
    const docRef = await addDoc(collection(db, "blogPost"), {
      tittle: inputTittle.value,
      disruption: textarea.value,
    });
    getpost();
  } catch (e) {
    Toastify({

      text: "Error adding document: ", e,
      
      duration: 3000
      
      }).showToas


  }finally{
    addDataBtn.innerText = "ADD"
  }
  inputTittle.value = ""
  textarea.value = ""
  input.style.display = "none"

};

const getpost = async () => {
  
  tableDataRow.innerHTML = ""
  loderWrapper.style.display = "block"



//   if(querySnapshot.empty){

// console.log("empty")
//     // tableDataRow.innerHTML = `<h3>No Data Found</h3>`
//   }
  const querySnapshot = await getDocs(collection(db, "blogPost"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data())
    const { tittle, disruption } = doc.data();
 
    

    tableDataRow.innerHTML += `
    
    <div class="table">
    <img src="../../assets/images/foods/img-1.jpg" alt="">
    <h3>${tittle}</h3>
    <p>${disruption}</p>
    <button><i id="EditBtn" onclick="deletePost('${doc.id}')" class="fa-solid fa-pen-to-square"></i></button>
    <button><i id="delBtn" onclick="deletePost('${doc.id}', this)" class="fi ti-trash"></i></button>
</div>

`;
loderWrapper.style.display = "none"
    // console.log(`${doc.id}`);
  });
};
getpost();




window.deletePost =async(id, e) =>{


  await deleteDoc(doc(db, "blogPost", id));


  console.log(id,e)
  getpost();
}





















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
