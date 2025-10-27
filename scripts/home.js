import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


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
const db = getFirestore();


const btn_exit = document.getElementById('btn-exit');
let title_home = document.getElementById('title');

window.addEventListener('load', () => {
    const user_uid = localStorage.getItem('loggedInUserId');
    const docRef = doc(db, "users", user_uid);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                title_home.innerHTML = `Добро пожаловать, ${userData.email}`;
            }
            else {
                console.log("no document found matching id")
            }
        })
        .catch((error) => {
            console.log("Error getting document");
        });
});

btn_exit.addEventListener('click', (e) => {
    localStorage.clear();
    window.location.href = '../index.html';
});