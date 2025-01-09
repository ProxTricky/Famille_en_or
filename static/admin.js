let currentQuestionIndex = 0;
let gameWindowLoaded = false;
const teamScores = {
    team1: 0,
    team2: 0,
    team3: 0,
    team4: 0
};

// Attendre que la fenêtre du jeu soit chargée
if (gameWindow) {
    gameWindow.onload = () => {
        gameWindowLoaded = true;
        displayQuestion(currentQuestionIndex);
    };
}

const questionElement = document.getElementById('admin-current-question');
const answersListElement = document.getElementById('admin-answers-list');
const team1ScoreElement = document.getElementById('admin-team1-score');
const team2ScoreElement = document.getElementById('admin-team2-score');
const team3ScoreElement = document.getElementById('admin-team3-score');
const team4ScoreElement = document.getElementById('admin-team4-score');

function updateScore(team, points) {
    teamScores[`team${team}`] += points;
    document.getElementById(`admin-team${team}-score`).textContent = teamScores[`team${team}`];

    // Synchroniser avec la fenêtre du jeu
    if (gameWindowLoaded) {
        gameWindow.postMessage({
            type: 'updateScore',
            team: team,
            score: teamScores[`team${team}`]
        }, '*');
    }
}

function displayQuestion(index) {
    if (index >= questions.length) {
        alert('Fin du jeu !');
        return;
    }

    const question = questions[index];
    questionElement.textContent = question.question;
    
    // Effacer les anciennes réponses
    answersListElement.innerHTML = '';
    
    // Créer les éléments de réponse
    question.answers.forEach((answer, idx) => {
        const answerCard = document.createElement('div');
        answerCard.className = 'admin-answer-card';
        
        // Créer le contenu de la réponse
        const answerContent = document.createElement('div');
        answerContent.className = 'answer-content';
        answerContent.innerHTML = `
            <span class="text">${answer.text}</span>
            <span class="points">${answer.points} pts</span>
        `;
        
        // Créer les boutons d'équipe
        const teamButtons = document.createElement('div');
        teamButtons.className = 'team-buttons';
        teamButtons.innerHTML = Object.entries(teamNames).map(([key, name], i) => `
            <button class="team-button team${i + 1}" data-team="${i + 1}">${name}</button>
        `).join('');
        
        // Ajouter les gestionnaires d'événements pour les boutons d'équipe
        teamButtons.querySelectorAll('.team-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const team = parseInt(button.dataset.team);
                updateScore(team, answer.points);
                answerCard.classList.add('points-given');
                teamButtons.querySelectorAll('.team-button').forEach(btn => btn.disabled = true);
            });
        });
        
        answerCard.appendChild(answerContent);
        answerCard.appendChild(teamButtons);
        
        answerCard.addEventListener('click', () => handleAnswerClick(answerCard, answer, idx));
        answersListElement.appendChild(answerCard);
    });

    // Synchroniser avec la fenêtre du jeu
    if (gameWindowLoaded) {
        gameWindow.postMessage({
            type: 'newQuestion',
            question: question.question,
            answers: question.answers
        }, '*');
    }
}

function handleAnswerClick(answerCard, answer, index) {
    if (!answerCard.classList.contains('revealed')) {
        answerCard.classList.add('revealed');
        
        // Envoyer le message à la fenêtre du jeu
        if (gameWindowLoaded) {
            gameWindow.postMessage({
                type: 'revealAnswer',
                index: index,
                answer: answer
            }, '*');
        }
    }
}

// Gestionnaire d'import de fichier
document.getElementById('questionFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/import', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Questions importées avec succès');
            location.reload();
        } else {
            alert(`Erreur: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de l\'import');
    }
});

document.getElementById('admin-next-question').addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
});

document.getElementById('admin-reset-question').addEventListener('click', () => {
    const answerCards = document.querySelectorAll('.admin-answer-card');
    answerCards.forEach(card => {
        card.classList.remove('revealed', 'points-given');
        card.querySelectorAll('.team-button').forEach(btn => btn.disabled = false);
    });
    
    // Réinitialiser la fenêtre du jeu
    if (gameWindowLoaded) {
        gameWindow.postMessage({
            type: 'resetQuestion'
        }, '*');
    }
});
