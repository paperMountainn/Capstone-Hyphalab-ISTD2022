from random import random
from flask import render_template, url_for, flash, redirect, request
from flaskContamML import app

@app.route("/")
def home():
    return "hi steph"
