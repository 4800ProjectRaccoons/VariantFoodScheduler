import random
import requests

spoonacular_api_key='1860d9cb5fb5432d894efb7ec63f484b'
class FoodRecipes():

#get random food
    def setCalorieRange(self):
        self.calorie = 1000
        self.minCalorie = int(self.calorie) - int(self.calorie) * .10
        return self.minCalorie

    def randFood(self):
        urlFood = "https://api.spoonacular.com/recipes/findByNutrients"
        max_calories = 1000
        query_params="apiKey=" + spoonacular_api_key + "&maxCalories=" + str(max_calories) + "&minCalories=" + str(max_calories - 100)
        query = urlFood + "?" + query_params
        self.spoonacular_response = requests.get(query)

        datastore = random.choice(self.spoonacular_response.json())
        self.id = str(datastore['id'])

        #now get ingredients  using the id of the food
        urlFoodIngredients = "https://api.spoonacular.com/recipes/" + self.id + "/ingredientWidget.json"
        query_params_ingredients = "apiKey=" + spoonacular_api_key
        query_ingredients = urlFoodIngredients + "?" + query_params_ingredients
        spoonacular_response = requests.get(query_ingredients)
        ingredient_information = spoonacular_response.json()

        print(self.id + " /" + datastore['title'] + "/ " +  datastore['image'] + " Calories: " + str(datastore['calories']) + "\n\n")
        for ingr in ingredient_information['ingredients']:
            print(ingr['name'])

#print([ingredient_information])
