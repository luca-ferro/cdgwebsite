import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://formspree.io/f/mkndeqwj");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const formData = new FormData(form);
                saveFormDataToLocalStorage(
                    formData.get('name'),
                    formData.get('email'),
                    formData.get('phone'),
                    formData.get('sellers')
                );

                const dbRef = ref(db)

                get(child(dbRef, 'Counter')).then((snapshot)=>{
                    var countVariable = Number(snapshot.val());
                    countVariable++;
                    
                    update(ref(db,"/"),{Counter: countVariable});
                    window.location.href = "success.html";
                });
                
            } else {
                console.error("Form submission failed:", xhr.status);
                alert("Erro no envio dos dados, tente novamente.")
            }
            loader.classList.add("loader--hidden");
        };
        var formData = new FormData(form);
        xhr.send(JSON.stringify(Object.fromEntries(formData)));
    });
});