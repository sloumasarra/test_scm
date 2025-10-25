const projects = [
  {
      id: 1,
      title: "Aide aux enfants",
      description: "Fournir du matériel scolaire.",
      image: "projet1.jpg",
      deadline: "30 Avril 2025",
      targetAmount: 5000,
      donors: [{ name: "Alice", amount: 200 }, { name: "Bob", amount: 100 }]
  },
  {
      id: 2,
      title: "Soutien alimentaire",
      description: "Distribution de repas aux familles.",
      image: "projet2.jpg",
      deadline: "15 Mai 2025",
      targetAmount: 3000,
      donors: []
  }
];

const projectsList = document.getElementById("projects-list");

function displayProjects() {
    projectsList.innerHTML = "";
    projects.forEach((project) => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" >
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <button class="details-btn" onclick="viewDetails(${project.id})">Voir Détails</button>
            </div>
        `;

        projectsList.appendChild(card);
    });
}


function displayProjectDetails(project) {
  const totalCollected = project.donors.reduce((sum, donor) => sum + donor.amount, 0);
  const remainingAmount = project.targetAmount-totalCollected;
  document.getElementById("total-collected").textContent = `${totalCollected} dt`;
  document.getElementById("remaining-amount").textContent = `${remainingAmount} dt`;
}

function viewDetails(id) {
  const project = projects.find(p => p.id === id);
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-image").src = project.image;
  document.getElementById("project-deadline").textContent = project.deadline;
  
  const donorsList = document.getElementById("donors-list");
  donorsList.innerHTML = project.donors.length ? 
      project.donors.map(d => `<tr><td>${d.name}</td><td>${d.amount}</td></tr>`).join("") : "<tr><td colspan='2'>Aucun donateur</td></tr>";
      displayProjectDetails(project);

  document.getElementById("delete-btn").disabled = project.donors.length > 0;
  document.getElementById("project-details").style.display = "flex";
}

function closeDetails() {
  document.getElementById("project-details").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
  });
});

displayProjects();
