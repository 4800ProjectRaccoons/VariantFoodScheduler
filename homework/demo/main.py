from flask import Flask
import json
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

food_db = [
  {
    "name" : "Burger",
    "price" : 5.99,
    "calories" : 354
  },
  {
    "name" : "Rice",
    "price" : 2.99,
    "calories" : 206
  },
  {
    "name" : "Cereal",
    "price" : 3.99,
    "calories" : 307
  },
  {
    "name" : "Oatmeal",
    "price" : 3.49,
    "calories" : 158
  },
  {
    "name" : "Chicken Porridge",
    "price" : 6.99,
    "calories" : 110
  },
  {
    "name" : "Beef Wellington",
    "price" : 29.99,
    "calories" : 427
  }
]

# @app.route("/search/<budget>")
# def search_food(budget):
#   budget = float(budget)
#   res = []
#   for food in food_db:
#     if food["price"] <= budget:
#       res.append(food)
#   return json.dumps(res)

@app.route("/randomize/<calories>")
def randomize(calories):
  calories = float(calories)
  res = []
  i = 0
  while i != 3:
    food = random.choice(food_db)
    if food["calories"] <= calories:
      res.append(food)
      i += 1
  return json.dumps(res)

app.run(host = "0.0.0.0")