import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, update, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
        
        runTransaction(counterRef, (currentData) => {
            if (!currentData) {
                return 1;
            } else {
                const sum = currentData + Number(formData.get('quantity'));
                return sum;
            }
        })
        .then((transactionResult) => {
            const newCounter = transactionResult.snapshot.val();
            localStorage.setItem('Number', newCounter);
            const newUserId = String(newCounter);
            const userRef = ref(db, 'users/' + newUserId);
            
            update(ref(db, "/"), { Counter: newCounter });
            set(userRef, {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                sellers: formData.get('sellers')
            });
            window.location.href = "success.html";
        })
        .catch((error) => {
            console.error("Transaction failed:", error);
            alert("Erro ao salvar os dados na base de dados. Tente novamente.");
            loader.classList.add("loader--hidden");
        });
    });
});