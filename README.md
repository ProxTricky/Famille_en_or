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
git clone https://github.com/ProxTricky/Famille_en_or.git
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

Le format CSV permet d'importer plusieurs questions à la fois. Chaque question suit le format suivant :
```csv
Question 1
Réponse 1,6
Réponse 2,5
Réponse 3,4
Réponse 4,3
Réponse 5,2
Réponse 6,1

Question 2
Réponse 1,6
Réponse 2,5
Réponse 3,4
Réponse 4,3
Réponse 5,2
Réponse 6,1

Question 3
...
```

- Une ligne vide sépare chaque question
- Pour chaque question :
  - La première ligne contient la question
  - Les lignes suivantes contiennent les réponses et leurs points, séparés par une virgule
  - Maximum 6 réponses par question
  - Les points sont automatiquement attribués de manière décroissante (6 à 1)

⚠️ **Important** : L'import de nouvelles questions remplace complètement les questions existantes. Les questions précédentes seront supprimées.

### Format JSON

Le format JSON permet également d'importer plusieurs questions à la fois :
```json
{
  "questions": [
    {
      "question": "Question 1",
      "answers": [
        {"text": "Réponse 1", "points": 6},
        {"text": "Réponse 2", "points": 5},
        {"text": "Réponse 3", "points": 4},
        {"text": "Réponse 4", "points": 3},
        {"text": "Réponse 5", "points": 2},
        {"text": "Réponse 6", "points": 1}
      ]
    },
    {
      "question": "Question 2",
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

⚠️ **Important** : Comme pour le format CSV, l'import de nouvelles questions remplace toutes les questions existantes.

### Import des Questions

1. Sur la page d'accueil, cliquez sur "Importer des Questions"
2. Sélectionnez votre fichier CSV ou JSON
3. Les questions seront automatiquement chargées dans le jeu, remplaçant toutes les questions précédentes
4. Un message de confirmation apparaîtra pour indiquer le succès de l'import

### Questions par Défaut

Le jeu est livré avec un ensemble de questions par défaut dans le fichier `example_questions.csv`. Ces questions seront :
- Chargées au premier lancement du jeu
- Remplacées lors de l'import de nouvelles questions
- Restaurées si vous supprimez toutes les questions importées

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
