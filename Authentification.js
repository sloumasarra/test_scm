document.addEventListener("DOMContentLoaded",function(){
    const loginForm=document.getElementById("loginForm");
    const errorMessage=document.getElementById("errorMessage");
    const registerMessage=document.getElementById("registerMessage");

    // Compte fictif (exemple) car on a pas fait php
    const fakeUser = {
        pseudo: "admin",
        mdp: "1234"
    };
    // Événement de soumission du formulaire
    lofinForm.addEventListener("submit",function(event){
        event.preventDefault(); // Empêcher le rechargement de la page
        let username=document.getElementById("username").value;
        let password=document.getElementById("password").value;

    // Vérification des identifiants
    if(username==fakeUser.pseudo && password==fakeUser.mdp){
        errorMessage.style.color="green";
        errorMessage.textContent="connexion réussie !";
        //Nettoyer l'eventuel msg d'inscription
        registerMessage.innerHTML="";
        // Redirection après 2 secondes
        setTimeout(() => {
            window.location.href = "Accueil.html";
        }, 2000);
    }    
    else {
        errorMessage.style.color = "red";
        errorMessage.textContent = "Pseudo ou mot de passe incorrect.";

        // Proposer l'inscription si l'utilisateur n'a pas de compte
        registerMessage.innerHTML = `<p>Pas encore de compte ? <a href="inscriptionDonneur.html">Inscrivez-vous ici</a></p>`;
    }

    })

});