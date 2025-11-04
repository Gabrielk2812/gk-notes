// Import the functions you need from the SDKs you need
// Import Firebase modules (CDN imports only)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4rbC0Q5pRbKrpN7l0BYrVrPZ-zWHgXZI",
  authDomain: "gk-notes-ce62e.firebaseapp.com",
  projectId: "gk-notes-ce62e",
  storageBucket: "gk-notes-ce62e.firebasestorage.app",
  messagingSenderId: "879142934317",
  appId: "1:879142934317:web:f4b9ffa6f78ff73c7da5a4",
  measurementId: "G-3XJJ2JR3S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// --- REGISTER PAGE ---
const registerBtn = document.getElementById("formSubmitRegister");
if (registerBtn) {
  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Creating account...");
        LoadNextPage();
      })
      .catch((error) => alert(error.message));
  });
}

// --- LOGIN PAGE ---
const loginBtn = document.getElementById("formSubmitLogin");
if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Logging in...");
        LoadNextPage();
      })
      .catch((error) => alert(error.message));
  });
}