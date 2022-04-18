from flask import Flask, render_template, session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abcd1234"

boggle_game = Boggle()

@app.route('/')
def home_page():
    """Return a page that shows Boggle game board"""

    session['boggle_board'] = boggle_game.make_board()
    
    return render_template("home.html", board=session['boggle_board'])