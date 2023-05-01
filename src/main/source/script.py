import random
import requests

#spoonacular_api_key='8a2108e9f2824129b62849bbf5d70987'
#spoonacular_api_key='dcc067f01411450e9f000e5af0f832fc'
spoonacular_api_key='1860d9cb5fb5432d894efb7ec63f484b'

class FoodRecipes():

    #Constructor
    def __init__(self, max_calories, type, diet, intolerances):
        self.max_calories = max_calories
        self.type = type
        self.diet = diet
        self.intolerances = intolerances
        self.datastore = self.getFoodData()
        self.id = self.getFoodId()

    def setCalorieRange(self):
        self.minCalorie = int(self.max_calories) - int(self.max_calories) * .10
        return self.minCalorie

    def setIntolerances(self, _intolerances):
        self.intolerances = _intolerances

    #get random food data
    def getFoodData(self):
        urlFood = "https://api.spoonacular.com/recipes/complexSearch"

        query_cal = "&maxCalories=" + str(self.max_calories) + "&minCalories=" + str(self.max_calories - 100)
        query_diet = "&diet=" + str(self.diet)
        query_type = "&type=" + str(self.type)
        query_intolerances = "&intolerances=" + str(self.intolerances)

        if self.max_calories == 0:
            query_cal = ""

        if self.diet == 0:
            query_diet = "&addRecipeNutrition=true"
        
        if self.intolerances == "none":
            query_intolerances = ""

        query_params = "apiKey=" + spoonacular_api_key + query_cal + query_type + query_diet + query_intolerances
        query = urlFood + "?" + query_params

        print(query)

        self.spoonacular_response = requests.get(query)

        datastore = random.choice(self.spoonacular_response.json()["results"])
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