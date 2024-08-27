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
      Toastify({
        text: "SignIn",
        duration: 3000,
      }).showToast();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Toastify({
        text: errorMessage,

        duration: 3000,
      }).showToast();
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "../dashboard/dashboard.html";
  }
});

loginBtn.addEventListener("click", login);
