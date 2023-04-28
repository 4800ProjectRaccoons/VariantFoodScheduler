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

@app.route("/randomize/<calories1>/<calories2>/<calories3>")
def randomize(calories1, calories2, calories3):
  calories1 = float(calories1)
  calories2 = float(calories2)
  calories3 = float(calories3)
  food1 = FoodRecipes(calories1, "breakfast")
  food2 = FoodRecipes(calories2, "main course")
  food3 = FoodRecipes(calories3, "main course")
  res = []
  res.append(food1.datastore)
  res.append(food2.datastore)
  res.append(food3.datastore)
  return json.dumps(res)

app.run(host = "0.0.0.0", port = 8080)