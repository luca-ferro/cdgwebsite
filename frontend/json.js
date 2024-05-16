document.addEventListener("DOMContentLoaded", function () {
    fetch('sellers.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('sellers');
            data.sellers.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
