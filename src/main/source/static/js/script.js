const IMG_STYLE = "height: 200px; width: auto; border-radius: 10%;"

async function getFood() {
    const api_key='1860d9cb5fb5432d894efb7ec63f484b';

    // grab selected diet pattern
    var dietPattern = document.querySelector('#num_meals_selector').value;

    // grab input value
    var input1 = document.querySelector('#cal_input1').value;
    var input2 = document.querySelector('#cal_input2').value;
    var input3 = document.querySelector('#cal_input3').value;

    // grab unwanted ingredients
    var intolerances = "";
    const intolerances_checkboxes = document.querySelectorAll('input[type="checkbox"].intolerances');

    intolerances_checkboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        intolerances += (checkbox.value + ',');
      }
    })

    // if no input value
    if(input1 == "") {
      input1 = 0;
    }
    if(input2 == "") {
      input2 = 0;
    }
    if(input3 == "") {
      input3 = 0;
    }
    if(intolerances == "") {
      intolerances = "none";
    }
  
    // call the search server and get the result
    $.ajax({
      url: "/randomize/" + dietPattern + '/' + input1 + '/' + input2 + '/' + input3 + '/' + intolerances,
      success: function(res) {
        console.log(res);
        const food = JSON.parse(res);
        
        // variables that hold nutrients data
        const breakfast_nutrients = food[0].nutrition.nutrients;
        const lunch_nutrients = food[1].nutrition.nutrients;
        const dinner_nutrients = food[2].nutrition.nutrients;
        const [breakfast_macros, lunch_macros, dinner_macros] = [[],[],[]];

        // breakfast info
        const breakfast_title = food[0]["title"];
        const breakfast_img = food[0]["image"];
        extractMacros(breakfast_nutrients, breakfast_macros);

        // lunch info
        const lunch_title = food[1]["title"];
        const lunch_img = food[1]["image"];
        extractMacros(lunch_nutrients, lunch_macros);

        // dinner info
        const dinner_title = food[2]["title"];
        const dinner_img = food[2]["image"];
        extractMacros(dinner_nutrients, dinner_macros)
        
        //breakfast ingredients
        var ingr1 = "https://api.spoonacular.com/recipes/" + food[0]["id"] + "/ingredientWidget.json" + "?apiKey=" + api_key;
        fetch(ingr1)
        .then(response => response.json())
        .then(json => setIngrB(json))

        //lunch ingredients
        var ingr2 = "https://api.spoonacular.com/recipes/" + food[1]["id"] + "/ingredientWidget.json" + "?apiKey=" + api_key;
        fetch(ingr2)
        .then(response => response.json())
        .then(json => setIngrL(json))

        //dinner ingredients
        var ingr3 = "https://api.spoonacular.com/recipes/" + food[2]["id"] + "/ingredientWidget.json" + "?apiKey=" + api_key;
        fetch(ingr3)
        .then(response => response.json())
        .then(json => setIngrD(json))
        
        // render results
        document.getElementById("breakfastMeal").textContent = breakfast_title;
        document.getElementById("breakfastCal").textContent = breakfast_macros[0];
        document.getElementById("breakfastFat").textContent = breakfast_macros[1];
        document.getElementById("breakfastCarbs").textContent = breakfast_macros[2];
        document.getElementById("breakfastProtein").textContent = breakfast_macros[3];
        document.getElementById("breakfastImg").src = breakfast_img;
        document.getElementById("breakfastImg").class = "rounded-image";
        document.getElementById("breakfastImg").style = IMG_STYLE;

        document.getElementById("lunchMeal").textContent = lunch_title;
        document.getElementById("lunchCal").textContent = lunch_macros[0];
        document.getElementById("lunchFat").textContent = lunch_macros[1];
        document.getElementById("lunchCarbs").textContent = lunch_macros[2];
        document.getElementById("lunchProtein").textContent = lunch_macros[3];
        document.getElementById("lunchImg").src = lunch_img;
        document.getElementById("lunchImg").class = "rounded-image";
        document.getElementById("lunchImg").style = IMG_STYLE;

        document.getElementById("dinnerMeal").textContent = dinner_title;
        document.getElementById("dinnerCal").textContent = dinner_macros[0];
        document.getElementById("dinnerFat").textContent = dinner_macros[1];
        document.getElementById("dinnerCarbs").textContent = dinner_macros[2];
        document.getElementById("dinnerProtein").textContent = dinner_macros[3];
        document.getElementById("dinnerImg").src = dinner_img;
        document.getElementById("dinnerImg").class = "rounded-image";
        document.getElementById("dinnerImg").style = IMG_STYLE;

      },
      error: function(error) {
        console.log(error.Message);
      }
  });
}

function extractMacros(nutrients, macros) {
  nutrients.forEach(nutrient => {
    if (nutrient.name === 'Calories') {
      macros[0] = "Calories: " + nutrient.amount.toFixed(2) + ' ' + nutrient.unit
    } else if (nutrient.name === 'Fat') {
      macros[1] = "Fat: " + nutrient.amount.toFixed(2) + ' ' + nutrient.unit
    } else if (nutrient.name === 'Carbohydrates') {
      macros[2] = "Carbohydrates: " + nutrient.amount.toFixed(2) + ' ' + nutrient.unit
    } else if (nutrient.name === 'Protein') {
      macros[3] = "Protein: " + nutrient.amount.toFixed(2) + ' ' + nutrient.unit
    }
  })
}

  //set ingredients of json object
  async function setIngrB(json) {
    console.log(JSON.stringify(json));
    let ingredient_list = "Ingredients: ";
    for (let i = 0; i < json['ingredients'].length; i++)
    {
      let obj = json['ingredients'];
      ingredient_list += obj[i]['name'] + ", ";
      console.log(obj[i]['name']);
    }
    document.getElementById("breakfastIngr").textContent = ingredient_list;
  }

  async function setIngrL(json) {
    console.log(JSON.stringify(json));
    let ingredient_list = "Ingredients: ";
    for (let i = 0; i < json['ingredients'].length; i++)
    {
      let obj = json['ingredients'];
      ingredient_list += obj[i]['name'] + ", ";
      console.log(obj[i]['name']);
    }
    document.getElementById("lunchIngr").textContent = ingredient_list;
  }

    async function setIngrD(json) {
      console.log(JSON.stringify(json));
      let ingredient_list = "Ingredients: ";
      for (let i = 0; i < json['ingredients'].length; i++)
      {
        let obj = json['ingredients'];
        ingredient_list += obj[i]['name'] + ", ";
        console.log(obj[i]['name']);
      }
      document.getElementById("dinnerIngr").textContent = ingredient_list;
    }

