document.addEventListener("DOMContentLoaded", function () {
    let body = document.body;
    let footer = document.querySelector("footer");
    /*let div=document.createElement("div");
    div.className="classFormulaire";*/

    // Création du formulaire
    let form = document.createElement("form");
    form.className = "inscription-form";
    form.setAttribute("novalidate", "");
    let formTitle = document.createElement("h2");
    formTitle.textContent = "Inscription Responsable d'Association";
    formTitle.className = "form-title";
    form.prepend(formTitle);

    //Création des fieldsets
    let personalInfo = createFieldset("Coordonnées Personnelles");
    personalInfo.appendChild(createInput("text", "nom", "Nom", "Entrez votre nom", true));
    personalInfo.appendChild(createInput("text", "prenom", "Prénom", "Entrez votre prénom", true));
    personalInfo.appendChild(createInput("text", "cin", "Numéro CIN", "8 chiffres", true, "^[0-9]{8}$"));
    personalInfo.appendChild(createInput("email", "email", "Email", "exemple@gmail.com",true));

    let associationInfo = createFieldset("Informations de l'Association");
    associationInfo.appendChild(createInput("text", "nomAssociation", "Nom de l'association", "Entrez le nom", true));
    associationInfo.appendChild(createInput("text", "adresse", "Adresse", "Entrez l'adresse", true));
    associationInfo.appendChild(createInput("text", "idFiscal", "Identifiant Fiscal", "$XXX99", true, "^\\$[A-Z]{3}[0-9]{2}$"));
    associationInfo.appendChild(createInput("file", "logo", "Logo de l'association", "", true));

    let authInfo = createFieldset("Authentification");
    authInfo.appendChild(createInput("text", "pseudo", "Pseudo", "Uniquement des lettres", true, "^[A-Za-z]+$"));
    authInfo.appendChild(createInput("password", "password", "Mot de passe", "Min 8 lettres ou chiffres, finissant par $ ou #", true, "^(?=.*[A-Za-z0-9]{7,}[#$])"));
    authInfo.appendChild(createInput("password", "confirmPassword", "Confirmer Mot de passe", "Répétez votre mot de passe", true));

    // 🔹 **Ajout des fieldsets au formulaire AVANT le bouton**
    form.appendChild(personalInfo);
    form.appendChild(associationInfo);
    form.appendChild(authInfo);

    // 🔹 **Bouton de soumission**
    let submitButton = document.createElement("button");
    submitButton.textContent = "S'inscrire";
    submitButton.type = "submit";
    submitButton.className = "submit-button";
    form.appendChild(submitButton);

    // 🔹 **Ajout du formulaire avant le footer, sinon à la fin du body**
    if (footer) {
        body.insertBefore(form, footer);
    } else {
        body.appendChild(form);
    }

    // 🔹 **Fonction pour créer un champ input avec label et placeholder**
    function createInput(type, id, labelText, placeholder, required, pattern = "") {
        let div = document.createElement("div");
        div.className = "input-group";

        let label = document.createElement("label");
        label.setAttribute("for", id);
        label.textContent = labelText;

        let input = document.createElement("input");
        input.type = type;
        input.id = id;
        input.name = id;
        input.placeholder = placeholder;
        if (required) input.required = true;
        if (pattern) input.pattern = pattern;

        div.appendChild(label);
        div.appendChild(input);

        if (type === "password") {
            let toggleBtn = document.createElement("span");
            toggleBtn.textContent = "👁️";
            toggleBtn.className = "toggle-password";
            toggleBtn.style.cursor = "pointer";
            toggleBtn.style.marginLeft = "10px";
    
            toggleBtn.addEventListener("click", () => {
                if (input.type === "password") {
                    input.type = "text";
                    toggleBtn.textContent = "🙈"; // mot de passe visible
                } else {
                    input.type = "password";
                    toggleBtn.textContent = "👁️"; // mot de passe masqué
                }
            });
    
            div.appendChild(toggleBtn);
        }
        return div;

    }

    // Fonction de validation des champs
function validateInput(input, regex, errorMessage) {
    let errorSpan = input.nextElementSibling; // Sélectionne le span juste après l'input
    if (!regex.test(input.value)) {
        errorSpan.textContent = errorMessage;
        errorSpan.style.display = "block"; // Afficher l'erreur
        input.style.border = "2px solid red";
        return false;
    } else {
        errorSpan.style.display = "none"; // Cacher l'erreur si correct
        input.style.border = "2px solid green";
        return true;
    }
}

// Sélection des inputs
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let cin = document.getElementById("cin");
let email = document.getElementById("email");
let nomAssociation = document.getElementById("nomAssociation");
let adresse = document.getElementById("adresse");
let idFiscal = document.getElementById("idFiscal");
let pseudo = document.getElementById("pseudo");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

// Ajout des messages d'erreur sous chaque champ
document.querySelectorAll(".input-group input").forEach(input => {
    let errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    input.parentNode.appendChild(errorSpan);
});

// Ajout d'événements pour la validation en direct
nom.addEventListener("input", () => validateInput(nom, /^[A-Za-z\s]+$/, "Seules les lettres sont autorisées"));
prenom.addEventListener("input", () => validateInput(prenom, /^[A-Za-z\s]+$/, "Seules les lettres sont autorisées"));
cin.addEventListener("input", () => validateInput(cin, /^[0-9]{8}$/, "Le CIN doit contenir exactement 8 chiffres"));
email.addEventListener("input", () => validateInput(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email invalide"));
nomAssociation.addEventListener("input", () => validateInput(nomAssociation, /^.{3,}$/, "Nom trop court"));
adresse.addEventListener("input", () => validateInput(adresse, /^.{5,}$/, "Adresse trop courte"));
idFiscal.addEventListener("input", () => validateInput(idFiscal, /^\$[A-Z]{3}[0-9]{2}$/, "Format invalide (ex: $ABC12)"));
pseudo.addEventListener("input", () => validateInput(pseudo, /^[A-Za-z]+$/, "Uniquement des lettres"));
password.addEventListener("input", () => validateInput(password, /^(?=.*[A-Za-z0-9]{7,}[#$])/, "Doit contenir au moins 8 caractères (lettres ou chiffres) et finir par $ ou #"));

// Validation du mot de passe et confirmation
confirmPassword.addEventListener("input", () => {
    let errorSpan = confirmPassword.nextElementSibling;
    if (confirmPassword.value !== password.value) {
        errorSpan.textContent = "Les mots de passe ne correspondent pas !";
        errorSpan.style.display = "block";
        confirmPassword.style.border = "2px solid red";
    } 
    else {
        errorSpan.style.display = "none";
        confirmPassword.style.border = "2px solid green";
    }
});

// Gestion du submit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi si invalide
    let isValid = true;
    isValid &= validateInput(nom, /^[A-Za-z\s]+$/, "Seules les lettres sont autorisées");
    isValid &= validateInput(prenom, /^[A-Za-z\s]+$/, "Seules les lettres sont autorisées");
    isValid &= validateInput(cin, /^[0-9]{8}$/, "Le CIN doit contenir exactement 8 chiffres");
    isValid &= validateInput(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email invalide");
    isValid &= validateInput(nomAssociation, /^.{3,}$/, "Nom trop court");
    isValid &= validateInput(adresse, /^.{5,}$/, "Adresse trop courte");
    isValid &= validateInput(idFiscal, /^\$[A-Z]{3}[0-9]{2}$/, "Format invalide (ex: $ABC12)");
    isValid &= validateInput(pseudo, /^[A-Za-z]+$/, "Uniquement des lettres");
    isValid &= validateInput(password, /^[A-Za-z0-9]{8,}[#$]$/, "Au moins 8 caractères (lettres ou chiffres) et doit finir par $ ou #");

    if (password.value !== confirmPassword.value) {
        confirmPassword.nextElementSibling.textContent = "Les mots de passe ne correspondent pas !";
        confirmPassword.nextElementSibling.style.display = "block";
        confirmPassword.style.border = "2px solid red";
        isValid = false;
    }

    if (isValid) {
        alert("Inscription réussie !");
        form.reset();
    }
});

    // 🔹 **Fonction pour créer un fieldset avec un sous-titre**
    function createFieldset(titleText) {
        let fieldset = document.createElement("fieldset");

        let legend = document.createElement("legend");
        legend.textContent = titleText;
        fieldset.appendChild(legend);

        let subtitle = document.createElement("p");
        subtitle.className = "fieldset-subtitle";
        subtitle.textContent = "Veuillez remplir les informations suivantes.";
        fieldset.appendChild(subtitle);

        return fieldset;
    }
});
//div.appendChild(form);