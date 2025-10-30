import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

const btn_signout = document.getElementById('btn-signout')

window.addEventListener('load', (e) => {
    
})

btn_signout.addEventListener('click', (e) => {
    // const dialog = confirm('Na pewno chcesz sie wylogowac???')
    // if (dialog) {
    //     const auth = getAuth();
    //     signOut(auth).then(() => {
    //         console.log('Sign-out successful')
    //         localStorage.clear()
    //         window.location.href = '../index.html';
    //     }).catch((error) => {
    //         console.log('An error happened')
    //         // An error happened.
    //     });
    // }
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
        console.log(email)
    }
    console.log('niema')
});