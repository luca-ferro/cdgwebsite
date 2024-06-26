document.addEventListener("DOMContentLoaded", function() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    const numberData = JSON.parse(localStorage.getItem('Number'));

    const rifa = document.getElementById("number");
    rifa.textContent = `${numberData}`;

    if (formData) {
        const nome = document.getElementById("name");
        nome.textContent = `Nome: ${formData.name}`;
        const email = document.getElementById("email");
        email.textContent = `E-mail: ${formData.email}`;
        const telefone = document.getElementById("phone");
        telefone.textContent = `Telefone: (${formData.phone.slice(0,2)}) ${formData.phone.slice(2)}`;
        const seller = document.getElementById("seller");
        seller.textContent = `Quem vendeu: ${formData.seller}`
    } else {
        const formDataDisplay = document.getElementById("formDataDisplay");
        formDataDisplay.textContent = "Form data not available";
    }
});
