import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"


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

let list_categories = {
    "category1": "Pierwsze dania",
    "category2": "Drugie dania",
    "category3": "Ryby",
    "category4": "Przystawki",
    "category5": "Salatki",
    "category6": "Ciasta",
    "category7": "Desery",
    "category8": "Drozrzdiowe",
    "category9": "Inne"

};


const btn_exit = document.getElementById('btn-exit');
const myButton = document.getElementById('myButton');
let title_home = document.getElementById('title');
const select = document.getElementById('select');
const container = document.getElementById('container');
let name_category = document.getElementById('name-category');
let btn_add_recipe = document.getElementById('btn-add-recipe');
let click_save_recipe = document.getElementById('click-save-recipe');
const container_data = document.querySelector('.container-data');
const save_recipe = document.querySelector('.save-recipe');

let title_recipe = document.getElementById('title-recipe');
let value_recipe = document.getElementById('value-recipe');

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

myButton.addEventListener('click', () => {
    let key = select.value;
    container.style.display = 'none';
    name_category.innerHTML = list_categories[key];
    container_data.style.display = 'block';
});
btn_add_recipe.addEventListener('click', () => {
    container_data.style.display = 'none';
    save_recipe.style.display = 'block';
    document.getElementById('name-category1').innerHTML = `Dodawanie do kategorii: ${list_categories[select.value]}`;
});

click_save_recipe.addEventListener('click', () => {
    if (title_recipe.value && value_recipe.value) {
        const user_uid = localStorage.getItem('loggedInUserId');
        let cat = select.value;
        const docRef = doc(db, "recipe", user_uid);
        const myData = {
            [cat]:
            {
                title:title_recipe.value,
                value: value_recipe.value
            }
        };
        console.log(myData);
    
        setDoc(docRef, myData)
            .then(() => {
                alert('Przepis został dodany pomyślnie');
            })
            .catch((error) => {
                console.error("error writing document firestore", error);

            });
    }
});