document.getElementById('importForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('questionFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Veuillez sélectionner un fichier');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/import', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Questions importées avec succès !');
            fileInput.value = '';
        } else {
            alert(`Erreur: ${data.error}`);
        }
    } catch (error) {
        alert('Erreur lors de l\'importation des questions');
        console.error(error);
    }
});
