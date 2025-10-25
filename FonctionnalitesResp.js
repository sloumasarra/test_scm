document.addEventListener('DOMContentLoaded', () => {
    // Nom du responsable - Remplacer cette valeur par le nom réel du responsable connecté
    const responsableNom = "John Doe"; // Remplacer "John Doe" par la variable réelle ou dynamique selon l'authentification

    // Afficher le nom du responsable dans le paragraphe
    document.getElementById('nomResponsable').textContent = responsableNom;

    // Fonction pour rediriger vers une autre page
    function redirectTo(page) {
        window.location.href = page;
    }

    // Changer le menu de navigation dynamiquement
    const navbarActions = document.getElementById('menu');
    const isAuthenticated = true;  // Remplacez par la logique de connexion réelle (par exemple, vérifier un cookie ou une session)

    if (isAuthenticated) {
        navbarActions.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="profil.html">Mon Profil</a></li>
            <li class="nav-item"><a class="nav-link" href="projets.html">Mes Projets</a></li>
        `;

        // Gestion de la déconnexion
        document.getElementById('logoutBtn').addEventListener('click', function() {
            // Logique de déconnexion : supprimer les informations de connexion (ex: cookies, session)
            // Puis rediriger vers la page de connexion ou accueil
            window.location.href = "login.html";  // Remplacer par la page de déconnexion réelle
        });
    } else {
        navbarActions.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="login.html">Connexion</a></li>
            <li class="nav-item"><a class="nav-link" href="signup.html">Inscription</a></li>
        `;
    }
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
    // Ajouter cette fonction à tous les boutons de carte avec onclick
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const targetPage = this.getAttribute('onclick').match(/'(.*?)'/)[1];
            redirectTo(targetPage);
        });
    });
    
});
