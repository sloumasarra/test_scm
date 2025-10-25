document.getElementById('projectForm').addEventListener('submit', function(event){
    event.preventDefault();
    let image=document.getElementById('image').files[0];
    let titre=document.getElementById('titre').value;
    let description=document.getElementById('description').value;
    let montant=document.getElementById('Montant').value;
    let date=document.getElementById('date').value;
    let organisateur=document.getElementById('organisateur').value;

    if(image && titre && description && montant && date && organisateur){
        alert('Projet ajouté avec succès !');
        this.reset();
    }
    else{
        alert('Veuillez remplir tous les champs.');
    }
})
