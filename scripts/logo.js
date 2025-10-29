import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyBHVMcudI8tBbj1ChnvyzT1WAfj5cWZ6wk",
    authDomain: "js-project-55157.firebaseapp.com",
    projectId: "js-project-55157",
    storageBucket: "js-project-55157.firebasestorage.app",
    messagingSenderId: "1053405817543",
    appId: "1:1053405817543:web:308c3e5d09f6ef944eace2",
    firestoreURL: "https://firestore.googleapis.com/v1/projects/js-project-55157/databases/(default)/documents"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.onload = function () {
    const user_uid = localStorage.getItem('loggedInUserId');
    if (user_uid) {
        const db = getFirestore();
        const docRef = doc(db, "users", user_uid);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('email').value = userData.email;
                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
}


const btn_logo = document.getElementById('btn-logo');
const form_login = document.getElementById('login-form');
const messengerDiv = document.querySelector('.mesengeDiv');


function showMessage(messenger) {
    messengerDiv.style.display = "block";
    messengerDiv.innerHTML = messenger;
    setTimeout(function () {
        messengerDiv.style.display = "none";
    }, 5000);
}


btn_logo.addEventListener('click', (e) => {
    e.preventDefault();
    const email = form_login.email.value;
    const password = form_login.password.value;
    if (email === '' || password === '') {
        showMessage('Пожалуйста, заполните все поля');
        return;
    }
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showMessage('Успешный вход в систему');
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            showMessage('Неправильний email или пароль');
        });

});