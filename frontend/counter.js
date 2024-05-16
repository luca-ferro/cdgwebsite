document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
    var loader = document.querySelector(".loader");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        loader.classList.remove("loader--hidden");

        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            mail: document.getElementById("email").value,
            seller: document.getElementById("sellers").value,
            quantity: Number(document.getElementById("quantity").value)
        }

        const requestConfig = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formData)
        }
        
        console.log(requestConfig)

        fetch("http://192.168.11.105:9091/buyers", requestConfig)
        .then(response => response.json())
        .then(dataObject => {
            localStorage.setItem('formData', JSON.stringify(formData));
            localStorage.setItem('rifas', dataObject);
            window.location.href = "success.html"
        })
        .catch(error => {
            console.error("Transaction failed:", error);
            alert("Erro ao salvar os dados na base de dados. Tente novamente.");
            loader.classList.add("loader--hidden");
        });
    });
});