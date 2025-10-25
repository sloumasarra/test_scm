// Sélection du bouton burger et du menu

//Sélectionne le bouton burger ☰ dont la classe est .menu-toggle dans  HTML)
//Cette variable mobileMenu contient une référence à ce bouton.
const mobileMenu = document.querySelector(".menu-toggle");
//contient une référence au menu.
const navLinks = document.querySelector(".navbarActions");

// Ajouter l'événement de clic pour afficher/cacher le menu
//Ajoute un écouteur d'événement sur le bouton burger ☰.
//Quand l'utilisateur clique dessus, le code à l'intérieur s'exécute.
mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
/*Au début (.navbarActions a display: none;) → le menu est caché.
Quand on clique sur ☰ :
La classe "active" est ajoutée.
.navbarActions.active { display: flex; } → le menu devient visible.
Quand on clique à nouveau sur ☰ :
La classe "active" est supprimée.
.navbarActions revient à son état initial (display: none;) → le menu se cache à nouveau.
*/
//ki yecliqui al bouton m lewl ken l classe active msh mawjouda bsh yzidha o menu bsh yodhher o baad ki yaawd yecliqui tetnaha o menu ywali ma adsh dhaher
//classList.toggle dans javaScript est une méthode qui ajoute ou supprime une classe CSS d'un élément HTML.
//Pourquoi utiliser toggle ?
//✅ C'est plus court et plus propre que if-else.
//✅ Pas besoin de vérifier manuellement si la classe est présente ou non.
//✅ Permet d'activer/désactiver une classe facilement (comme pour afficher/cacher un menu).
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".impact-zone img");
    let index = 0;

    function changeImage() {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }

    setInterval(changeImage, 5000); // Change d'image toutes les 5 secondes
});

