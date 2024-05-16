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
            push(userRef, {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                sellers: formData.get('sellers')
            })
        }).then(() => {
            // Depois de adicionar o usuário, ouça eventos de alteração na referência "users"
            onValue(userRef, (snapshot) => {
                const users = []; // Array para armazenar os usuários
        
                // Iterar sobre os dados de snapshot para extrair os usuários
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val(); // Obter os dados do usuário
                    users.push(user); // Adicionar o usuário ao array
                });
        
                // Agora, a variável "users" contém a lista atualizada de usuários
                console.log(users); // Faça o que quiser com os usuários, por exemplo, renderize na interface do usuário
                console.log(users.length);
                localStorage.setItem("Number", users.length)
                window.location.href= "success.html"
            });
        }).catch((error) => {
            console.error("Erro ao adicionar usuário:", error);
        });
    });
});