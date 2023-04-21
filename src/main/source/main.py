from script import *
from flask import Flask, redirect,url_for,render_template
import json
from flask_cors import CORS
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route("/")
def homepage():
  return render_template("index.html")

@app.route("/randomize/<calories>")
def randomize(calories):
  calories = float(calories)
  food = FoodRecipes(calories)
  res = []
  res.append(food.datastore)
  return json.dumps(res)

app.run(host = "0.0.0.0", port = 8080)