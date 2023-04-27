import random
import requests

spoonacular_api_key='1860d9cb5fb5432d894efb7ec63f484b'

class FoodRecipes():

    #Constructor
    def __init__(self, max_calories = 1000):
        self.max_calories = max_calories    #default is 1000
        self.datastore = self.getFoodData()
        self.id = self.getFoodId()

    def setCalorieRange(self):
        self.minCalorie = int(self.max_calories) - int(self.max_calories) * .10
        return self.minCalorie
    
    #get random food data
    def getFoodData(self):
        urlFood = "https://api.spoonacular.com/recipes/findByNutrients"
        query_params="apiKey=" + spoonacular_api_key + "&maxCalories=" + str(self.max_calories) + "&minCalories=" + str(self.max_calories - 100)
        query = urlFood + "?" + query_params
        self.spoonacular_response = requests.get(query)
        datastore = random.choice(self.spoonacular_response.json())
        return datastore
    
    #get the id
    def getFoodId(self):
        return str(self.datastore['id'])
    
    #get the ingredients
    def getIngredients(self):
        #now get ingredients  using the id of the food
        urlFoodIngredients = "https://api.spoonacular.com/recipes/" + self.id + "/ingredientWidget.json"
        query_params_ingredients = "apiKey=" + spoonacular_api_key
        query_ingredients = urlFoodIngredients + "?" + query_params_ingredients
        spoonacular_response = requests.get(query_ingredients)
        ingredient_information = spoonacular_response.json()

        print(self.id + " /" + self.datastore['title'] + "/ " +  self.datastore['image'] + " Calories: " + str(self.datastore['calories']) + "\n\n")
        for ingr in ingredient_information['ingredients']:
            print(ingr['name'])