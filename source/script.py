import random
import requests

spoonacular_api_key='1860d9cb5fb5432d894efb7ec63f484b'

#get random food
urlFood = "https://api.spoonacular.com/recipes/findByNutrients"
max_calories = 1000
query_params="apiKey=" + spoonacular_api_key + "&maxCalories=" + str(max_calories) + "&minCalories=" + str(max_calories - 100)
query = urlFood + "?" + query_params
spoonacular_response = requests.get(query)

#store any random food from the query into variable
datastore = random.choice(spoonacular_response.json())
id = str(datastore['id'])

#now get ingredients  using the id of the food
urlFoodIngredients = "https://api.spoonacular.com/recipes/" + id + "/ingredientWidget.json"
query_params_ingredients = "apiKey=" + spoonacular_api_key
query_ingredients = urlFoodIngredients + "?" + query_params_ingredients
spoonacular_response = requests.get(query_ingredients)
ingredient_information = spoonacular_response.json()

print(id + " /" + datastore['title'] + "/ " +  datastore['image'] + " Calories: " + str(datastore['calories']) + "\n\n")
print(ingredient_information)

