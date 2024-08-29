import {
  getDownloadURL,
  uploadBytesResumable,
  storage,
  ref,
  uploadBytes,
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
let updateDataBtn = document.querySelector("#updateDataBtn");
let postImg = document.querySelector("#postImg");
let categories = document.querySelector("#categories");
let tableDataRow = document.querySelector("#tableDataRow");
let loderWrapper = document.querySelector("#loader");
let getImage;
let isEdit = null;
function formatDate() {
  let date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return date;
}
// const Crentuser = () => {
//   const user = auth.currentUser;

//   console.log(user);
//   if (user) {
//     // ...
//   } else {
//     // No user is signed in.
//   }
// };
// Crentuser();

postImg.addEventListener("change", () => {
  const files = postImg.files[0];

  const imagesRef = ref(storage, `blog/postImage/${files.name}`);
  console.log(imagesRef);

  const uploadTask = uploadBytesResumable(imagesRef, files);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        getImage = downloadURL;
      });
    }
  );
});
const addData = async () => {
  addDataBtn.innerText = "ADD........";

  if (
    inputTittle.value.trim() === "" ||
    textarea.value.trim() === "" ||
    categories.value == 0
  ) {
    console.error("not");

    Toastify({
      text: "Something wrong",

      duration: 3000,
    }).showToast();
  } else {
    try {
      const docRef = await addDoc(collection(db, "blogPost"), {
        tittle: inputTittle.value,
        disruption: textarea.value,
        categorie: categories.value,
        img: getImage,
        postDate: formatDate(),
      });
      getpost();
    } catch (e) {
      Toastify({
        text: "Error adding document: ",
        e,
        duration: 3000,
      }).showToas;
    } finally {
      addDataBtn.innerText = "ADD";
    }
  }
  addDataBtn.innerText = "ADD";
  inputTittle.value = "";
  textarea.value = "";
  input.style.display = "none";
};

const getpost = async () => {
  tableDataRow.innerHTML = "";
  loderWrapper.style.display = "block";

  //   if(querySnapshot.empty){

  // // console.log("querySnapshot")
  //     // tableDataRow.innerHTML = `<h3>No Data Found</h3>`
  //   }
  const querySnapshot = await getDocs(collection(db, "blogPost"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.data())
    const { tittle, disruption, img } = doc.data();

    tableDataRow.innerHTML += `
    
    <div class="table">
    <img src="${img}" alt="">
    <h3>${tittle}</h3>
    <p>${disruption}</p>
    <button><i id="EditBtn" onclick="editPost('${doc.id}')" class="fa-solid fa-pen-to-square"></i></button>
    <button><i id="delBtn" onclick="deletePost('${doc.id}', this)" class="fi ti-trash"></i></button>
</div>

`;
    loderWrapper.style.display = "none";
    // console.log(`${doc.id}`);
  });
};
getpost();

window.deletePost = async (id, e) => {
  try {
    await deleteDoc(doc(db, "blogPost", id));
  } catch (error) {
    Toastify({
      text: error,

      duration: 3000,
    }).showToast();
  }
  getpost();
};

window.editPost = async (id) => {
  addDataBtn.style.display = "none";
  updateDataBtn.style.display = "block";
  if (input.style.display === "none") {
    addBtn.style.transform = "rotate(45deg)";
    input.style.display = "block";
  } else {
    input.style.display = "none";
    addBtn.style.transform = "rotate(0)";
  }

  try {
    let editDat = await getDoc(doc(db, "blogPost", id));
    const { tittle, disruption } = editDat.data();
    console.log(tittle);
    inputTittle.value = tittle;
    textarea.value = disruption;
    addDataBtn.innerText = "Update";
    isEdit = id;
  } catch (error) {
    Toastify({
      text: error,
      duration: 3000,
    }).showToast();
  }
};

const updateData = async () => {
  input.style.display = "none";

  updateDataBtn.innerText = "Updating....";
  try {
    let editDat = await updateDoc(doc(db, "blogPost", isEdit), {
      tittle: inputTittle.value,
      disruption: textarea.value,
      categorie: categories.value,
      img: getImage,
      postDate: formatDate(),
    });
    updateDataBtn.innerText = "Update";
    input.style.display = "none";
    getpost();
  } catch (error) {
    updateDataBtn.innerText = "Update";
    Toastify({
      text: error,
      duration: 3000,
    }).showToast();
  }

  inputTittle.value = "";
  textarea.value = "";
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
  updateDataBtn.style.display = "none";

  if (input.style.display === "none") {
    addBtn.style.transform = "rotate(45deg)";
    input.style.display = "block";
  } else {
    input.style.display = "none";
    addBtn.style.transform = "rotate(0)";
  }
};

addDataBtn.addEventListener("click", addData);
updateDataBtn.addEventListener("click", updateData);
logoutBtn.addEventListener("click", logout);
addBtn.addEventListener("click", add);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login/login.html";
  }
});
