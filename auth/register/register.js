import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  auth,
} from "../../firebas.js";

let UserInput = document.querySelectorAll("#userInput input");
const [email, pas, cPass] = UserInput;

let UserInputErro = document.querySelectorAll("#userInput p");
const [emailEr, pasEr, cPassEr] = UserInputErro;

let SignupBtn = document.querySelector("#SignupBtn");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*])[A-Za-z\d@!$%^&*]{8,}$/;
let emptyString = /^[A-Za-z]+$/;
let isValid;

let errorObj = [
  {
    feild: email,
    regx: emailPattern,
    errorMsg: "  Email is not a valid ",
    errorFeild: emailEr,
  },
  {
    feild: pas,
    regx: passwordPattern,
    errorMsg: "Password is not a valid  ",
    errorFeild: pasEr,
  },
  {
    feild: cPass,
    regx: passwordPattern,
    errorMsg: "Password is not a valid",
    errorFeild: cPassEr,
  },
];


const signup = () => {
  cekValid()
  if(!cekValid()){
    
    


    createUserWithEmailAndPassword(auth, email.value, pas.value)
    .then((userCredential) => {
      SignupBtn.innerText = "Sign Up....."
      const user = userCredential.user;
      SignupBtn.innerText = "Sign Up"
      window.location.href = "../login/login.html";
    })
    .catch((error) => {
      SignupBtn.innerText = "Sign Up....."
      const errorCode = error.code;
      const errorMessage = error.message;
      SignupBtn.innerText = "Sign Up"
      alert(error.message);
    });




  }
};






const cekValid = () => {
  isValid = false;

  errorObj.forEach((value) => {
    if (!value.regx.test(value.feild.value)) {
      value.errorFeild.innerHTML = value.errorMsg;
      isValid = true;
    }
  

    setTimeout(()=>{
      value.errorFeild.innerHTML = "";
    },1000);
  
  });
return isValid
}







SignupBtn.addEventListener("click", signup);

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "../dashboard/dashboard.html";
  }
});
