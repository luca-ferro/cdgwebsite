document.addEventListener("DOMContentLoaded", function() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    const numberData = JSON.stringify(localStorage.getItem('rifas')).replaceAll('"', "").split(",").join(", ");

    console.log(numberData)

    const rifa = document.getElementById("number");
    rifa.textContent = `${numberData}`;

    if (formData) {
        const nome = document.getElementById("name");
        nome.textContent = `Nome: ${formData.name}`;
        const email = document.getElementById("email");
        email.textContent = `E-mail: ${formData.mail}`;
        const telefone = document.getElementById("phone");
        telefone.textContent = `Telefone: ${formData.phone}`;
        const seller = document.getElementById("seller");
        seller.textContent = `Quem vendeu: ${formData.seller}`
    } else {
        const formDataDisplay = document.getElementById("formDataDisplay");
        formDataDisplay.textContent = "Form data not available";
    }
});
