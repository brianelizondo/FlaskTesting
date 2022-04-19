from crypt import methods
from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abcd1234"

boggle_game = Boggle()
current_words = []

@app.route('/')
def home_page():
    """Return a page that shows Boggle game board"""
    session['boggle_board'] = boggle_game.make_board()
    return render_template("home.html", board=session['boggle_board'], high_sc=session['high_score'] )

@app.route('/submit_guess', methods=["POST"])
def submit_guess():
    """
    Take the form value and check if the word is valid on the board using the check_valid_word function 
    and respond with JSON using the jsonify function
    """
    word = request.form['user_word']

    if word in current_words:
        result_check = "previously-sent"
    else:
        result_check = boggle_game.check_valid_word(session['boggle_board'], word)
        current_words.append(word)

    word_check = {"result": result_check}
    return jsonify(word_check)

@app.route('/statistics')
def save_statistics():
    """Keep track of how many times the user has played as well as their highest score so far"""
    if session.get('game_played') is not None:
        session['game_played'] = session['game_played'] + 1
    else:
        session['game_played'] = 1
    
    new_high_score = "false"
    current_score = int(request.args["score"])
    if current_score > session['high_score']:
        new_high_score = "true"
        session['high_score'] = current_score
    
    return new_high_score