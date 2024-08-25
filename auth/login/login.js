import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  auth,
} from "../../firebas.js";

let loginInput = document.querySelectorAll("#loginInput input");
const [email, pass] = loginInput;
// console.log(email,pass)

let loginInputErro = document.querySelectorAll("#loginInput p");
const [emailErro, passErro] = loginInputErro;
// console.log(emailErro,passErro)
let loginBtn = document.querySelector("#loginBtn");

const login = () => {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Admin SignIn");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "../dashboard/dashboard.html";
  }
});

loginBtn.addEventListener("click", login);
