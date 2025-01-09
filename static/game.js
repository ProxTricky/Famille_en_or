let currentQuestionIndex = 0;
const teamScores = {
    team1: 0,
    team2: 0,
    team3: 0,
    team4: 0
};

const questionElement = document.getElementById('current-question');
const answersListElement = document.getElementById('answers-list');
const team1ScoreElement = document.getElementById('team1-score');
const team2ScoreElement = document.getElementById('team2-score');
const team3ScoreElement = document.getElementById('team3-score');
const team4ScoreElement = document.getElementById('team4-score');

// Créer et ajouter le sélecteur d'équipe et l'overlay au DOM
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

const teamSelector = document.createElement('div');
teamSelector.className = 'team-selector';
teamSelector.innerHTML = `
    <h3>Attribuer les points à :</h3>
    <button class="team1">Équipe 1</button>
    <button class="team2">Équipe 2</button>
    <button class="team3">Équipe 3</button>
    <button class="team4">Équipe 4</button>
    <button class="cancel">Annuler</button>
`;
document.body.appendChild(teamSelector);

function updateTeamScore(team, score) {
    teamScores[`team${team}`] = score;
    document.getElementById(`team${team}-score`).textContent = score;
}

function displayQuestion(question) {
    document.getElementById('current-question').textContent = question.question;
    
    // Reset all answer cards
    const cards = document.querySelectorAll('.answer-card');
    cards.forEach(card => {
        card.classList.add('hidden');
        card.querySelector('.answer').textContent = '';
        card.querySelector('.points').textContent = '';
    });

    // Fill in the answers
    question.answers.forEach((answer, index) => {
        if (index < cards.length) {
            const card = cards[index];
            card.querySelector('.answer').textContent = answer.text;
            card.querySelector('.points').textContent = answer.points;
            
            card.addEventListener('click', function() {
                if (this.classList.contains('hidden')) {
                    this.classList.remove('hidden');
                    this.classList.add('revealed');
                    updateScore(currentTeam, parseInt(answer.points));
                }
            });
        }
    });
}

function revealAnswer(index, answer) {
    const answerCards = document.querySelectorAll('.answer-card');
    const answerCard = answerCards[index];
    
    if (answerCard && answerCard.classList.contains('hidden')) {
        answerCard.textContent = `${answer.text} (${answer.points} points)`;
        answerCard.classList.remove('hidden');
        answerCard.classList.add('revealed');
        
        // Ajouter l'événement de clic pour attribuer les points
        answerCard.addEventListener('click', () => {
            if (!answerCard.classList.contains('selected')) {
                selectedAnswer = answerCard;
                showTeamSelector();
            }
        });
    }
}

function resetQuestion() {
    const answerCards = document.querySelectorAll('.answer-card');
    answerCards.forEach(card => {
        card.className = 'answer-card hidden';
        card.textContent = '?';
    });
}

function showTeamSelector() {
    overlay.classList.add('active');
    teamSelector.classList.add('active');
}

function hideTeamSelector() {
    overlay.classList.remove('active');
    teamSelector.classList.remove('active');
}

// Gestionnaires d'événements pour le sélecteur d'équipe
teamSelector.querySelector('.team1').addEventListener('click', () => {
    if (selectedAnswer) {
        teamScores.team1 += parseInt(selectedAnswer.dataset.points);
        team1ScoreElement.textContent = teamScores.team1;
        selectedAnswer.classList.add('selected');
    }
    hideTeamSelector();
});

teamSelector.querySelector('.team2').addEventListener('click', () => {
    if (selectedAnswer) {
        teamScores.team2 += parseInt(selectedAnswer.dataset.points);
        team2ScoreElement.textContent = teamScores.team2;
        selectedAnswer.classList.add('selected');
    }
    hideTeamSelector();
});

teamSelector.querySelector('.team3').addEventListener('click', () => {
    if (selectedAnswer) {
        teamScores.team3 += parseInt(selectedAnswer.dataset.points);
        team3ScoreElement.textContent = teamScores.team3;
        selectedAnswer.classList.add('selected');
    }
    hideTeamSelector();
});

teamSelector.querySelector('.team4').addEventListener('click', () => {
    if (selectedAnswer) {
        teamScores.team4 += parseInt(selectedAnswer.dataset.points);
        team4ScoreElement.textContent = teamScores.team4;
        selectedAnswer.classList.add('selected');
    }
    hideTeamSelector();
});

teamSelector.querySelector('.cancel').addEventListener('click', () => {
    hideTeamSelector();
});

// Écouter les messages de l'interface admin
window.addEventListener('message', (event) => {
    switch (event.data.type) {
        case 'newQuestion':
            displayQuestion(event.data.question);
            break;
        case 'revealAnswer':
            revealAnswer(event.data.index, event.data.answer);
            break;
        case 'resetQuestion':
            resetQuestion();
            break;
        case 'updateScore':
            updateTeamScore(event.data.team, event.data.score);
            break;
    }
});
