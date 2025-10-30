import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { getDatabase, ref, set, child, get } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'
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
const db = getFirestore();
const base = getDatabase(app)
const dbRef = ref(getDatabase());

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
    document.getElementById('text-recipe').style.display = 'none'
    const user_uid = localStorage.getItem('loggedInUserId');
    const docRef = doc(db, "users", user_uid);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                title_home.innerHTML = `Witaj, ${userData.email}`;
            }
            else {
                console.log("no document found matching id")
            }
        })
        .catch((error) => {
            console.log("Error getting document");
        });
});

// btn_exit.addEventListener('click', (e) => {
//     const dialog = confirm('Na pewno chcesz sie wylogowac???')
//     if (dialog) {
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             console.log('Sign-out successful')
//             localStorage.clear()
//             window.location.href = '../index.html';
//         }).catch((error) => {
//             console.log('An error happened')
//             // An error happened.
//         });
//     }
// });

myButton.addEventListener('click', () => {
    let key = select.value;
    container.style.display = 'none';
    name_category.innerHTML = list_categories[key];
    container_data.style.display = 'block';
    createBlockRecipe(key)
});

function createBlockRecipe(cat) {
    const user_uid = localStorage.getItem('loggedInUserId');
    const container = document.getElementById('list-recipe');
    get(child(dbRef, `${user_uid}/${cat}`)).then((snapshot) => {
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                let item = document.createElement('p')
                item.textContent = `${key}`
                item.style.backgroundColor = 'lightblue'
                item.style.padding = '15px'
                item.style.borderRadius = '15px';
                item.style.boxShadow = '10px 10px 15px blue';
                item.addEventListener('click', function (event) {
                    let title_recipe = event.target.textContent;
                    create_boxRecipe(title_recipe)
                    container.style.display = 'none'
                });
                container.style.backgroundColor = 'black'
                container.style.padding = '20px 10px 20px 10px'
                container.append(item)
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
function create_boxRecipe(title_recipe) {
    const user_uid = localStorage.getItem('loggedInUserId');
    let cat = select.value;
    get(child(dbRef, `${user_uid}/${cat}/${title_recipe}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const text_recipe = document.getElementById('text-recipe')
            text_recipe.style.display = 'block'
            const recept = document.getElementById('recipe')
            recept.innerHTML = snapshot.val()
            text_recipe.append(recept)
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

btn_add_recipe.addEventListener('click', () => {
    container_data.style.display = 'none';
    save_recipe.style.display = 'block';
    document.getElementById('list-recipe').style.display = 'none'
    document.getElementById('name-category1').innerHTML = `Dodawanie do kategorii: ${list_categories[select.value]}`;
    document.getElementById('text-recipe').style.display = 'none'
});

click_save_recipe.addEventListener('click', () => {
    const user_uid = localStorage.getItem('loggedInUserId');
    if (title_recipe.value && value_recipe.value) {
        let category = select.value;
        let title = title_recipe.value
        let recept = value_recipe.value
        set(ref(base, `${user_uid}/${category}/${title}`),
            recept
        );
        document.getElementById('save-recipe').style.display = 'none'
        document.getElementById('container-data').style.display = 'block'
        document.getElementById('list-recipe').style.display = 'block'
        
    }
});