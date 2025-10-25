document.addEventListener("DOMContentLoaded", function() {
    let projectData = localStorage.getItem("selectedProject");
    
    if (projectData) {
        projectData = JSON.parse(projectData);
        document.getElementById("project-name").textContent = projectData.name;
        document.getElementById("remaining-amount").textContent = projectData.remaining;
    } else {
        document.getElementById("project-name").textContent = "Projet non trouvé";
        document.getElementById("remaining-amount").textContent = "0";
    }

    document.getElementById("donation-form").addEventListener("submit", function(event) {
        event.preventDefault();
        let donationAmount = parseFloat(document.getElementById("donation-amount").value);
        let remainingAmountElem = document.getElementById("remaining-amount");
        let remainingAmount = parseFloat(remainingAmountElem.textContent);
        let confirmationMessage = document.getElementById("confirmation-message");

        if (donationAmount > 0 && donationAmount <= remainingAmount) {
            remainingAmount -= donationAmount;
            remainingAmountElem.textContent = remainingAmount.toFixed(2);
            localStorage.setItem("selectedProject", JSON.stringify({ 
                name: projectData.name, 
                remaining: remainingAmount.toFixed(2) 
            }));
            confirmationMessage.textContent = "Merci pour votre don de " + donationAmount.toFixed(2) + " TND !";
            confirmationMessage.classList.remove("hidden");
            confirmationMessage.style.color = "green";
        } else {
            confirmationMessage.textContent = "Montant invalide. Veuillez entrer un montant valide.";
            confirmationMessage.classList.remove("hidden");
            confirmationMessage.style.color = "red";
        }
    });
});