from crypt import methods
from flask import Flask, render_template, session, request, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abcd1234"

boggle_game = Boggle()

@app.route('/')
def home_page():
    """Return a page that shows Boggle game board"""

    session['boggle_board'] = boggle_game.make_board()
    
    return render_template("home.html", board=session['boggle_board'])


@app.route('/submit_guess', methods=["POST"])
def submit_guess():
    """
    Take the form value and check if the word is valid on the board using the check_valid_word function 
    and respond with JSON using the jsonify function
    """
    word = request.form['user_word']
    word_check = {"result": boggle_game.check_valid_word(session['boggle_board'], word)}
    return jsonify(word_check)