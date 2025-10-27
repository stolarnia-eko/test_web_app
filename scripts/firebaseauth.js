// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyBHVMcudI8tBbj1ChnvyzT1WAfj5cWZ6wk",
    authDomain: "js-project-55157.firebaseapp.com",
    projectId: "js-project-55157",
    storageBucket: "js-project-55157.firebasestorage.app",
    messagingSenderId: "1053405817543",
    appId: "1:1053405817543:web:308c3e5d09f6ef944eace2",
    databaseURL: "https://js-project-55157-default-rtdb.firebaseio.com/",
    firestoreURL: "https://firestore.googleapis.com/v1/projects/js-project-55157/databases/(default)/documents"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const btn_start = document.getElementById('btn-start');
const btn_registr = document.getElementById('btn-registr');
const form_registr = document.getElementById('form-registr');
const block_info = document.querySelector('.block-info');

function showMessage(message) {
    block_info.style.display = "block";
    block_info.innerHTML = message;
    setTimeout(function () {
        block_info.style.display = "none";
    }, 5000);
}

btn_registr.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        showMessage('Пожалуйста, заполните все поля');
        return;
    }
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
            };
            showMessage('Аккаунт успешно создан');
            
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'logo.html';
                })
                .catch((error) => {
                    console.error("error writing document firestore", error);

                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Адрес электронной почты уже существует !!!');
            }
            else {
                showMessage('Hевозможно создать пользователя');
            }
        })
});

const btn_logo = document.getElementById('btn-logo');



// function showMessage(message, divId) {
//     var messageDiv = document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//         messageDiv.style.opacity = 0;
//     }, 5000);
// }
// const signUp = document.getElementById('submitSignUp');
// signUp.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('rEmail').value;
//     const password = document.getElementById('rPassword').value;


//     const auth = getAuth();
//     const db = getFirestore();

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             const user = userCredential.user;
//             const userData = {
//                 email: email,
//             };
//             showMessage('Account Created Successfully', 'signUpMessage');
//             const docRef = doc(db, "users", user.uid);
//             setDoc(docRef, userData)
//                 .then(() => {
//                     window.location.href = 'index.html';
//                 })
//                 .catch((error) => {
//                     console.error("error writing document", error);

//                 });
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode == 'auth/email-already-in-use') {
//                 showMessage('Email Address Already Exists !!!', 'signUpMessage');
//             }
//             else {
//                 showMessage('unable to create User', 'signUpMessage');
//             }
//         })
// });

// const signIn = document.getElementById('submitSignIn');
// signIn.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const auth = getAuth();

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             showMessage('login is successful', 'signInMessage');
//             const user = userCredential.user;
//             localStorage.setItem('loggedInUserId', user.uid);
//             window.location.href = 'homepage.html';
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             if (errorCode === 'auth/invalid-credential') {
//                 showMessage('Incorrect Email or Password', 'signInMessage');
//             }
//             else {
//                 showMessage('Account does not Exist', 'signInMessage');
//             }
//         })
// })