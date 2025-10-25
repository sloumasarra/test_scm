// Fonction pour activer le mode édition
function enableEdit() {
    // Activer tous les champs du formulaire
    const inputs = document.querySelectorAll('#profileForm input');
    inputs.forEach(input => input.disabled = false);

    // Afficher "Enregistrer" et cacher "Modifier"
    document.getElementById('saveButton').style.display = 'inline-block';
    document.getElementById('editButton').style.display = 'none';

    // Afficher le champ d'upload de logo
    document.getElementById('logo').style.display = 'inline-block';
}
