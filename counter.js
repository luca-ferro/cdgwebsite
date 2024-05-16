import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref,onValue, get, set, update, runTransaction, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCiuErprDUEsVZei9CqphrHcmFtMO1t66o",
    authDomain: "cdg-auto-increment.firebaseapp.com",
    databaseURL: "https://cdg-auto-increment-default-rtdb.firebaseio.com",
    projectId: "cdg-auto-increment",
    storageBucket: "cdg-auto-increment.appspot.com",
    messagingSenderId: "342708503614",
    appId: "1:342708503614:web:072cfc7a06e8be09707d6f",
    measurementId: "G-SFN16JH7VG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function findUserPositionById(users, userId) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            return i; // Retorna a posição do usuário no array quando encontrado
        }
    }
    return -1; // Retorna -1 se o usuário não for encontrado
}

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    var loader = document.querySelector(".loader");

    function saveFormDataToLocalStorage(name, email, phone, seller) {
        localStorage.setItem('formData', JSON.stringify({ name, email, phone, seller }));
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        loader.classList.remove("loader--hidden");

        const formData = new FormData(form);
        saveFormDataToLocalStorage(
            formData.get('name'),
            formData.get('email'),
            formData.get('phone'),
            formData.get('sellers')
        );
        
        const counterRef = ref(db, 'Counter');

        let timer = async() => {await new Promise(r => {setTimeout(r,  Math.random() * 3)})}
        timer();
        const userRef = ref(db, 'users');

        runTransaction(userRef, () => {
            console.log(userRef);
            const newUser = push(userRef, {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                sellers: formData.get('sellers')
            })
            const userId = newUser.key;
            localStorage.setItem("Id", userId);
            console.log("Novo usuário adicionado com ID:", userId);
        }).then(() => {
            onValue(userRef, (snapshot) => {
                const users = []; // Array para armazenar os usuários
            
                // Iterar sobre os dados de snapshot para extrair os usuários
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val(); // Obter os dados do usuário
                    user.id = childSnapshot.key; // Adicionar o ID do usuário aos dados
                    users.push(user); // Adicionar o usuário ao array
                });
            
                // Agora, a variável "users" contém a lista atualizada de usuários com IDs
            
                // Suponha que você tenha o ID do usuário que deseja encontrar
                const userIdToFind = localStorage.getItem("Id");
            
                // Encontrar a posição do usuário com o ID desejado
                const userPosition = findUserPositionById(users, userIdToFind);
                localStorage.setItem("Number", userPosition)
                window.location.href= "success.html"
            });
        }).catch((error) => {
            console.error("Erro ao adicionar usuário:", error);
        });
    });
});