// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZ0rkhNNoDif6Jp4c3fxrwjIoH4Rg26V0",
    authDomain: "login-and-signup-js.firebaseapp.com",
    projectId: "login-and-signup-js",
    storageBucket: "login-and-signup-js.appspot.com",
    messagingSenderId: "107982795085",
    appId: "1:107982795085:web:5408481fbf58902e6d4704",
    measurementId: "G-FS858TLC95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

// Signup

var name = document.getElementById("userName");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var password = document.getElementById("password");

function clear() {
    name.value = ""
    email.value = ""
    phone.value = ""
    password.value = ""
}

window.createAccount = function () {
    var obj = {
        userName: name.value,
        userEmail: email.value,
        userPhone: phone.value,
        userPassword: password.value
    }
    createUserWithEmailAndPassword(auth, obj.userEmail, obj.userPassword)
        .then(function (res) {
            obj.id = res.user.uid
            const reference = ref(database, `users/${obj.id}/`);
            set(reference, obj)
                .then((function () {
                    clear();
                    alert("User Created Successfully");
                    window.location.assign('./login.html');
                }))
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((function (err) {
            alert(err.message)
        }))
}

// Login

var loginEmail = document.getElementById("email");
var loginPassword = document.getElementById("password");

window.login = function () {
    var newObj = {
        loginEmail: loginEmail.value,
        loginPassword: loginPassword.value
    }
    signInWithEmailAndPassword(auth, newObj.loginEmail, newObj.loginPassword)
        .then((res) => {
            alert("Login Successfully")
            console.log(res.user.uid);
        })
        .catch((err) => {
            alert(err.message);
        })
}