import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, updateDoc, query, where, getDocs, deleteDoc, doc, collection } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7MI_jaZfCZwGn8nzGEgDw60wjkA-Ivng",
    authDomain: "test-script-27e3c.firebaseapp.com",
    projectId: "test-script-27e3c",
    storageBucket: "test-script-27e3c.firebasestorage.app",
    messagingSenderId: "606340762693",
    appId: "1:606340762693:web:0a858eb6e6adb7dec8e72c",
    //databaseURL: "https://js-project-55157-default-rtdb.firebaseio.com/",
    //firestoreURL: "https://firestore.googleapis.com/v1/projects/js-project-55157/databases/(default)/documents"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userId = '';
const select = document.getElementById('select')


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        userId = uid;
        create_list_recipe(userId)

    } else {
    }
});

const list_recipe = []

async function getData(category) {
    const recipesArray = [];
    const recipesCollectionRef = collection(db, "users", userId, "recipes");
    const querySnapshot = await getDocs(recipesCollectionRef);

    querySnapshot.forEach((doc) => {
        // doc.data() возвращает поля документа как объект JS
        const recipeData = doc.data();
        // Добавляем данные в массив, опционально включая ID документа
        recipesArray.push({
            id: doc.id, // ID документа Firestore (полезно для обновлений/удалений)
            ...recipeData // Остальные данные (title, text, category, createdAt)
        });
    });
    return recipesArray;
}





const dot_vertical = document.getElementById('dot-vertical');
dot_vertical.addEventListener('click', (e) => {
    const block = dot_vertical.nextElementSibling;
    block.classList.toggle("show");
});
const click_signOut = document.getElementById('signout');
click_signOut.addEventListener('click', (e) => {
    click_signOut.classList.remove('show')
    window.location.href = 'signout.html'
})

function update_box_list_recipe(listRecipe) {

    for (let index = 0; index < listRecipe.length; index++) {
        const element = listRecipe[index];
        const listItem = document.createElement('li');
        const div_list = document.createElement('div');

        const box_left = document.createElement('div')
        const p_title = document.createElement('p');
        const p_support = document.createElement('p');
        const img = document.createElement('img');

        p_support.innerText = 'support text';
        p_support.classList.add('support-recipe')
        p_title.innerText = element.title;
        p_title.classList.add('name-recipe')

        img.src = '../assets/icons/icons8-delete-48.png';
        img.classList.add('img_delete')

        box_left.appendChild(p_title)
        box_left.appendChild(p_support);

        div_list.appendChild(box_left);

        listItem.appendChild(div_list)
        listItem.appendChild(img)

        listItem.classList.add('list_item')
        listItem.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                click_img_delete(p_title.innerText)
            }
            else {
                click_list_item(p_title.innerText);

            }
        })
        container.appendChild(listItem);
    }
}

//код створення списку рецептiв
const container = document.getElementById('list-recipe');

function create_list_recipe() {
    getData().then(recipes => {
        update_box_list_recipe(recipes)
    });
}
///////////// finisz ///////////

// --- код коли вибираемо категорiю --------
document.querySelector('select').addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    list_recipe.length = 0;
    container.innerHTML = ''
    if (select.value === 'Wszystkie przepisy') {
        create_list_recipe()
        return;
    }
    update_list_recipe(selectedValue).then(recipes => {
        update_box_list_recipe(recipes)
    })

})
async function update_list_recipe(category) {
    const list_recipe_category = []
    const recipesCollectionRef = collection(db, "users", userId, "recipes");
    const q = query(recipesCollectionRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() возвращает поля документа как объект JS
        const recipeData = doc.data();

        list_recipe_category.push({
            id: doc.id,
            ...recipeData
        });
    })
    return list_recipe_category;
}
///////////// --- finisz --------

////////------- коли клик на list recipe ---------

async function click_list_item(name_recipe) {
    document.getElementById('dialog-recipe').style.display = 'flex';
    container.innerHTML = '';
    name_recipe_global = name_recipe;
    const recipesCollectionRef = collection(db, "users", userId, "recipes");
    const q = query(recipesCollectionRef, where("title", "==", name_recipe));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // doc.data() возвращает поля документа как объект JS
        const recipeData = doc.data();
        getTextRecipe(recipeData.text)
    })
}

function getTextRecipe(text_recipe) {
    document.getElementById('block-text-recipe').innerText = text_recipe;
}
let bool_btn_edit = true;
document.getElementById('edit-recipe').addEventListener('click', (e) => {
    let text_start_edit = document.getElementById('block-text-recipe').innerText;
    if (bool_btn_edit) {
        document.getElementById('block-text-recipe').style.display = 'none'
        document.getElementById('text-recipe').value = text_start_edit;
        document.getElementById('text-recipe').style.display = 'block';
        bool_btn_edit = false;
    }
    else {
        update_text_recipe()
        bool_btn_edit = true;
        document.getElementById('block-text-recipe').style.display = 'block'
        document.getElementById('text-recipe').style.display = 'none';
    }


})
async function update_text_recipe() {
    let newText = document.getElementById('text-recipe').value;
    document.getElementById('block-text-recipe').innerText = newText;
    const recipesCollectionRef = collection(db, "users", userId, "recipes");
    const q = query(recipesCollectionRef, where("title", "==", name_recipe_global));

    const querySnapshot = await getDocs(q);
    const recipeIds = [];
    querySnapshot.forEach((doc) => {
        recipeIds.push(doc.id);
    });
    const recipeId = recipeIds[0]
    const recipeDocRef = doc(db, "users", userId, "recipes", recipeId);

    try {
        // 2. Вызываем функцию updateDoc() для изменения данных
        await updateDoc(recipeDocRef, {
            text: newText // Объект, указывающий, какие поля обновить
        });

        console.log("Поле 'text' успешно обновлено для рецепта:", recipeId);

    } catch (error) {
        console.error("Ошибка при обновлении поля 'text':", error);
        // Обработайте ошибку, например, покажите уведомление пользователю
    }
}



document.getElementById('close-dialog-recipe').addEventListener('click', (e) => {
    document.getElementById('dialog-recipe').style.display = 'none'
    create_list_recipe(list_recipe)
    document.getElementById('text-recipe').style.display = 'none';
    document.getElementById('block-text-recipe').style.display = 'block';
})
/////////////////////////////////////////
// код для видалення рецепту
let name_recipe_global = ''
function click_img_delete(name_recipe) {
    document.getElementById('dialog').style.display = 'flex';
    document.getElementById('recipe').innerText = name_recipe;
    name_recipe_global = name_recipe;
}

async function delete_recipe() {
    const recipesCollectionRef = collection(db, "users", userId, "recipes");
    const q = query(recipesCollectionRef, where("title", "==", name_recipe_global));

    const querySnapshot = await getDocs(q);
    const recipeIds = [];
    querySnapshot.forEach((doc) => {
        recipeIds.push(doc.id);
    });
    const recipeId = recipeIds[0]
    const recipeDocRef = doc(db, "users", userId, "recipes", recipeId);
    try {
        // 2. Вызываем функцию deleteDoc()
        await deleteDoc(recipeDocRef);

        console.log("Рецепт успешно удален:", recipeId);
        // Вы можете обновить UI здесь, например, удалить элемент списка

    } catch (error) {
        console.error("Ошибка при удалении рецепта:", error);
        // Обработайте ошибку, например, покажите уведомление пользователю
        throw error;
    }

}

document.getElementById('btn-close').addEventListener('click', (e) => {
    document.getElementById('dialog').style.display = 'none';

});
document.getElementById('btn-yes').addEventListener('click', (e) => {
    document.getElementById('dialog').style.display = 'none';
    delete_recipe()
    // тут видаляэмо рецепт
})
///////////////////////////////////////////////////////////////////////////////
//додавання рецепту
document.getElementById('add-recipe').addEventListener('click', (e) => {
    select.value = 'Pierwsze dania'
    window.location.href = 'add_recipe.html'
})





