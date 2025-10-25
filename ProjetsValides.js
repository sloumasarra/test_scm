document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM chargé, chargement des projets...");
    loadProjects();
});

const projects = [
    {
        id_projet: 1,
        titre: "Aide aux enfants sans-abri",
        description: "Fournir des vêtements et de la nourriture aux enfants sans-abri.",
        date_limite: "2025-06-30",
        montant_total_a_collecter: 5000,
        montant_total_collecte: 1200,
        image: "projet1.jpg"
    },
    {
        id_projet: 2,
        titre: "Construction d'une école",
        description: "Construire une école dans une région défavorisée.",
        date_limite: "2025-08-15",
        montant_total_a_collecter: 15000,
        montant_total_collecte: 7500,
        image: "projet2.jpg"
    },
    {
        id_projet: 3,
        titre: "Aide aux réfugiés",
        description: "Soutien médical et alimentaire aux réfugiés.",
        date_limite: "2025-07-10",
        montant_total_a_collecter: 10000,
        montant_total_collecte: 4000,
        image: "projet3.jpg"
    },
    {
        id_projet: 4,
        titre: "Distribution de nourriture",
        description: "Collecte de fonds pour la distribution de nourriture aux sans-abris.",
        date_limite: "2025-03-31", // Projet expiré
        montant_total_a_collecter: 3000,
        montant_total_collecte: 2500,
        image: "project4.jpg"
    },
    {
        id_projet: 5,
        titre: "Aide aux orphelins",
        description: "Soutenir les orphelins dans le besoin avec des soins de santé et une éducation.",
        date_limite: "2025-06-01", // Projet expiré
        montant_total_a_collecter: 7000,
        montant_total_collecte: 4000,
        image: "project5.jpg"
    },
    {
        id_projet: 6,
        titre: "Installation d'eau potable",
        description: "Construire des installations pour fournir de l'eau potable dans des villages reculés.",
        date_limite: "2025-09-20",
        montant_total_a_collecter: 12000,
        montant_total_collecte: 5000,
        image: "project6.jpg"
    }
];

function loadProjects() {
    const loader = document.getElementById("loader");
    const projectsList = document.getElementById("projects-list");
    const noProjectsMessage = document.getElementById("no-projects-message");

    loader.style.display = "block";
    projectsList.innerHTML = "";

    setTimeout(() => {
        const today = new Date().toISOString().split("T")[0]; // Date actuelle au format YYYY-MM-DD

        // Filtrer les projets valides
        const validProjects = projects.filter(project => 
            new Date(project.date_limite) >= new Date(today) &&
            project.montant_total_collecte < project.montant_total_a_collecter
        );

        loader.style.display = "none";

        if (validProjects.length === 0) {
            noProjectsMessage.classList.remove("hidden");
        } else {
            noProjectsMessage.classList.add("hidden");
            validProjects.forEach(project => {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");

                // Calcul du pourcentage collecté
                const pourcentageCollecte = ((project.montant_total_collecte / project.montant_total_a_collecter) * 100).toFixed(2);

                projectCard.innerHTML = `
                    <img src="images/${project.image}" alt="${project.titre}" class="project-image">
                    <h3>${project.titre}</h3>
                    <p>${project.description}</p>
                    <p><strong>Date limite :</strong> ${project.date_limite}</p>
                    <p><strong>Montant à collecter :</strong> ${project.montant_total_a_collecter} TND</p>
                    <p><strong>Pourcentage collecté :</strong></p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${pourcentageCollecte}%"></div>
                    </div>
                    <p class="progress-percentage">${pourcentageCollecte}%</p>
                    <button class="details-btn" data-id="${project.id_projet}">Voir détails</button>
                `;

                projectsList.appendChild(projectCard);
            });

            console.log("Boutons créés :", document.querySelectorAll(".details-btn")); // Vérifie la présence des boutons

            document.querySelectorAll(".details-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const projectId = this.getAttribute("data-id");
                    console.log("Bouton cliqué pour le projet ID:", projectId); // Vérifie si le clic est bien détecté
                    showProjectDetails(projectId);
                });
            });
        }
    }, 1000);
}

function showProjectDetails(projectId) {
    const project = projects.find(p => p.id_projet == projectId);
    if (!project) return;

    // Vérifier si une modale existe déjà et la supprimer
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
        existingModal.remove();
    }

    // Créer la fenêtre modale
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <!-- Bouton de fermeture (×) -->
            <button class="close-btn">&times;</button>
            <h2>${project.titre}</h2>
            <img src="images/${project.image}" alt="Image du projet" class="modal-image">
            <p>${project.description}</p>
            <p><strong>Date limite :</strong> ${project.date_limite}</p>
            <p><strong>Montant total du projet :</strong> ${project.montant_total_a_collecter} TND</p>
            <p><strong>Montant restant à collecter :</strong> ${project.montant_total_collecte} TND</p>
            <p><strong>Pourcentage collecté :</strong> ${((project.montant_total_collecte / project.montant_total_a_collecter) * 100).toFixed(2)}%</p>
            <button class="donate-btn" onclick="openDonationPage('Aide aux sans-abris', 500)">Faire un don</button>
        </div>
    `;

    // Ajouter la modal au body
    document.body.appendChild(modal);

    // Ajouter l'animation pour afficher la modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 50); // Attendre que la modal soit ajoutée avant d'appliquer l'animation

    // Fermer la fenêtre modale
    modal.querySelector(".close-btn").addEventListener("click", function () {
        modal.remove();
    });

    // Fermer la modale en cliquant en dehors
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Action de faire un don
    modal.querySelector(".donate-btn").addEventListener("click", function () {
        alert("Vous allez être redirigé vers la page de don.");
        modal.remove();
    });
}


function searchProjects() {
    const keyword = document.getElementById("searchKeyword").value.toLowerCase();
    const projects = document.querySelectorAll(".project-card");

    projects.forEach(project => {
        const title = project.querySelector("h3").innerText.toLowerCase();
        const description = project.querySelectorAll("p")[0].innerText.toLowerCase(); // Récupère le premier paragraphe

        if (title.includes(keyword) || description.includes(keyword)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

function showAllProjects() {
    document.querySelectorAll(".project-card").forEach(project => project.style.display = "block");
    // Vider la barre de recherche
    document.getElementById("searchKeyword").value = '';
}
//Ajoute un événement qui stocke les informations du projet dans localStorage avant de rediriger vers la page de donation.

function openDonationPage(projectName, remainingAmount) {
    localStorage.setItem("selectedProject", JSON.stringify({ name: projectName, remaining: remainingAmount }));
    window.location.href = "donation.html"; // Redirection vers la page de don
}

