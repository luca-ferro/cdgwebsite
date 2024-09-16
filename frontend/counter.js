document.addEventListener("DOMContentLoaded", function () {
    fetch('sellers.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('sellers');
            const user = document.getElementById('user');
            const passwordDiv = document.querySelector('.password');
            const passwordInput = document.getElementById('password');
            const passwordSubmitButton = document.getElementById('password-submit');
            const loader = document.querySelector('.loader'); // Ensure loader is selected
            let selectedSeller = null;

            data.sellers.forEach(seller => {
                const optionElement = document.createElement('option');
                optionElement.value = seller.name;
                optionElement.textContent = seller.name;
                select.appendChild(optionElement);
            });

            select.addEventListener('change', function () {
                user.textContent = select.value;
                selectedSeller = data.sellers.find(seller => seller.name === select.value);
            });

            const form = document.getElementById("contact-form");
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                passwordDiv.classList.remove('password--hidden');
                const quantidade = Number(document.getElementById("quantity").value)
                const valor = document.getElementById("totalprice")
                valor.textContent = "R$ " + quantidade * 5 + ",00"
            });

            passwordSubmitButton.addEventListener('click', function() {
                if (selectedSeller && passwordInput.value === selectedSeller.password) {
                    passwordDiv.classList.add('password--hidden');
                    loader.classList.remove('loader--hidden');

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
                    
                    fetch("https://www.cuidandodagente.com.br/buyers", requestConfig)
                    .then(response => response.json())
                    .then(dataObject => {
                        localStorage.setItem('formData', JSON.stringify(formData));
                        localStorage.setItem('rifas', dataObject);
                        window.location.href = "success.html"
                    })
                    .catch(error => {
                        console.error("Transaction failed:", error);
                        alert("Erro ao salvar os dados na base de dados. Tente novamente.");
                        loader.classList.add('loader--hidden');
                    });
                } else {
                    alert("Senha incorreta. Tente novamente.");
                    loader.classList.add('loader--hidden');
                }
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});