from flask import Flask, render_template, redirect
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abcd1234"

boggle_game = Boggle()

@app.route('/')
def home_page():
    """Return a page that shows Boggle game board"""
    return render_template("home.html")