# Une Famille en Or 🏆

Une adaptation web du célèbre jeu télévisé "Une Famille en Or". Ce jeu permet d'organiser des sessions amusantes où les équipes doivent deviner les réponses les plus populaires à diverses questions.

## 📋 Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Gestion des Questions](#gestion-des-questions)
- [Structure des Fichiers](#structure-des-fichiers)
- [Contribution](#contribution)

## ✨ Fonctionnalités

- 👥 Support jusqu'à 4 équipes
- 📝 Import de questions depuis des fichiers CSV ou JSON
- 🎮 Interface présentateur et interface joueur séparées
- 💯 Système de points automatique
- 🎯 Affichage style jeu télévisé
- 📱 Design responsive pour tous les appareils

## 🚀 Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd famille-en-or
```

2. Installez les dépendances Python :
```bash
pip install -r requirements.txt
```

3. Lancez l'application :
```bash
python app.py
```

L'application sera accessible à l'adresse `http://localhost:5000`

## 🎮 Utilisation

### Configuration du Jeu

1. Sur la page d'accueil, entrez les noms des équipes (jusqu'à 4)
2. Importez vos questions ou utilisez les questions par défaut
3. Cliquez sur "Commencer le Jeu"

### Interface Présentateur (Admin)

- URL : `http://localhost:5000/admin`
- Contrôle complet du jeu
- Affichage des réponses
- Gestion des scores
- Navigation entre les questions

### Interface Joueurs

- URL : `http://localhost:5000/game`
- Affichage des questions
- Visualisation des réponses révélées
- Scores des équipes
- Mode plein écran disponible

## 📝 Gestion des Questions

### Format CSV

Créez un fichier CSV avec la structure suivante :
```csv
Question
Réponse 1,6
Réponse 2,5
Réponse 3,4
Réponse 4,3
Réponse 5,2
Réponse 6,1
```

- La première ligne contient la question
- Chaque ligne suivante contient une réponse et son nombre de points, séparés par une virgule
- Maximum 6 réponses par question
- Les points sont automatiquement attribués de manière décroissante (6 à 1)

### Format JSON

Créez un fichier JSON avec la structure suivante :
```json
{
  "questions": [
    {
      "question": "Votre question ici",
      "answers": [
        {"text": "Réponse 1", "points": 6},
        {"text": "Réponse 2", "points": 5},
        {"text": "Réponse 3", "points": 4},
        {"text": "Réponse 4", "points": 3},
        {"text": "Réponse 5", "points": 2},
        {"text": "Réponse 6", "points": 1}
      ]
    }
  ]
}
```

### Import des Questions

1. Sur la page d'accueil, cliquez sur "Importer des Questions"
2. Sélectionnez votre fichier CSV ou JSON
3. Les questions seront automatiquement chargées dans le jeu

## 📁 Structure des Fichiers

```
famille-en-or/
├── app.py              # Application Flask principale
├── static/
│   ├── style.css      # Styles CSS
│   ├── game.js        # Logique côté joueur
│   └── admin.js       # Logique côté présentateur
├── templates/
│   ├── index.html     # Page d'accueil
│   ├── game.html      # Interface joueur
│   └── admin.html     # Interface présentateur
├── example_questions.csv  # Questions exemple
└── requirements.txt    # Dépendances Python
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

1. Fork le projet
2. Créez une nouvelle branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Inspiré du jeu télévisé "Une Famille en Or"
- Développé avec Flask et JavaScript
- Design inspiré du jeu original
