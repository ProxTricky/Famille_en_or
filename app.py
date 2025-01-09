from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os
import csv
import io

app = Flask(__name__)
app.secret_key = 'votre_clé_secrète_ici'  # Nécessaire pour les sessions

def process_csv(file):
    questions = []
    current_question = None
    answers = []
    
    csv_content = file.read().decode('utf-8')
    csv_reader = csv.reader(io.StringIO(csv_content))
    next(csv_reader)  # Skip header
    
    for row in csv_reader:
        if not row or not any(row):  # Skip empty rows
            continue
            
        if row[0]:  # New question
            if current_question:
                questions.append({
                    "question": current_question,
                    "answers": answers
                })
            current_question = row[0]
            answers = []
            if row[1]:  # First answer of new question
                answers.append({"text": row[1], "points": 6})
        elif row[1]:  # Additional answer
            points = max(1, 7 - len(answers) - 1)  # 6 points for first, 1 for last
            answers.append({"text": row[1], "points": points})
    
    # Add the last question
    if current_question:
        questions.append({
            "question": current_question,
            "answers": answers
        })
    
    return {"questions": questions}

def load_questions():
    try:
        with open('questions.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"questions": []}

def save_questions(questions):
    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    # Récupérer les noms d'équipes actuels s'ils existent
    team_names = session.get('team_names', {
        'team1': 'Équipe 1',
        'team2': 'Équipe 2',
        'team3': 'Équipe 3',
        'team4': 'Équipe 4'
    })
    return render_template('index.html', team_names=team_names)

@app.route('/setup', methods=['POST'])
def setup():
    team_names = {
        f'team{i+1}': request.form.get(f'team{i+1}', f'Équipe {i+1}')
        for i in range(4)
    }
    session['team_names'] = team_names
    return jsonify({'success': True})

@app.route('/admin')
def admin():
    # Utiliser les noms d'équipes par défaut si non définis
    team_names = session.get('team_names', {
        'team1': 'Équipe 1',
        'team2': 'Équipe 2',
        'team3': 'Équipe 3',
        'team4': 'Équipe 4'
    })
    questions = load_questions()
    return render_template('admin.html', 
                         questions=questions['questions'],
                         team_names=team_names)

@app.route('/game')
def game():
    # Utiliser les noms d'équipes par défaut si non définis
    team_names = session.get('team_names', {
        'team1': 'Équipe 1',
        'team2': 'Équipe 2',
        'team3': 'Équipe 3',
        'team4': 'Équipe 4'
    })
    questions = load_questions()
    return render_template('game.html', 
                         questions=questions['questions'],
                         team_names=team_names)

@app.route('/import', methods=['POST'])
def import_questions():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        if file.filename.endswith('.csv'):
            questions = process_csv(file)
        else:
            questions = json.loads(file.read())
        
        save_questions(questions)
        return jsonify({'message': 'Questions imported successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
