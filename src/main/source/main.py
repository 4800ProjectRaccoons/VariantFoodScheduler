from script import *
from flask import Flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/randomize/<calories>")
def randomize(calories):
  calories = float(calories)
  food = FoodRecipes(calories)
  res = []
  res.append(food.datastore)
  return json.dumps(res)

app.run(host = "0.0.0.0")