const DEFAULT_CAL_MIN = 300;
const DEFAULT_CAL_MAX = 1000;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getFood() {
    var api_key='dcc067f01411450e9f000e5af0f832fc';

    // grab selected diet pattern
    var dietPattern = document.querySelector('#num_meals_selector').value;

    // grab input value
    var input1 = document.querySelector('#cal_input1').value;
    var input2 = document.querySelector('#cal_input2').value;
    var input3 = document.querySelector('#cal_input3').value;

    // if no input value
    if(input1 == "") {
      input1 = getRandomInt(DEFAULT_CAL_MIN, DEFAULT_CAL_MAX);
    }
    if(input2 == "") {
      input2 = getRandomInt(DEFAULT_CAL_MIN, DEFAULT_CAL_MAX);
    }
    if(input3 == "") {
      input3 = getRandomInt(DEFAULT_CAL_MIN, DEFAULT_CAL_MAX);
    }
  
    // call the search server and get the result
    $.ajax({
      //url: "http://127.0.0.1:8080/randomize/" + dietPattern + '/' + input1 + '/' + input2 + '/' + input3,
      //url: "http://ec2-3-128-204-114.us-east-2.compute.amazonaws.com:8080/randomize/" + input1 + '/' + input2 + '/' + input3,
      url: "/randomize/" + dietPattern + '/' + input1 + '/' + input2 + '/' + input3,
      success: function(res) {
        console.log(res);
        
        var food = JSON.parse(res);

        var breakfast_title = food[0]["title"];
        var breakfast_cal = Math.ceil(food[0]["nutrition"]["nutrients"][0]["amount"]);
        var breakfast_img = food[0]["image"];

        var lunch_title = food[1]["title"];
        var lunch_cal = Math.ceil(food[1]["nutrition"]["nutrients"][0]["amount"]);
        var lunch_img = food[1]["image"];

        var dinner_title = food[2]["title"];
        var dinner_cal = Math.ceil(food[2]["nutrition"]["nutrients"][0]["amount"]);
        var dinner_img = food[2]["image"];
        
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
        
        document.getElementById("breakfastMeal").textContent = breakfast_title;
        document.getElementById("breakfastCal").textContent = breakfast_cal;
        document.getElementById("breakfastImg").src = breakfast_img;
        document.getElementById("breakfastImg").style = "height: 200px; width: auto;";

        document.getElementById("lunchMeal").textContent = lunch_title;
        document.getElementById("lunchCal").textContent = lunch_cal;
        document.getElementById("lunchImg").src = lunch_img;
        document.getElementById("lunchImg").style = "height: 200px; width: auto;";

        document.getElementById("dinnerMeal").textContent = dinner_title;
        document.getElementById("dinnerCal").textContent = dinner_cal;
        document.getElementById("dinnerImg").src = dinner_img;
        document.getElementById("dinnerImg").style = "height: 200px; width: auto;";

        // render the result in the list
  
      },
      error: function(error) {
        console.log(error.Message);
      }
    });
  }

  //set ingredients of json object
  async function setIngrB(json) {
    console.log(JSON.stringify(json));
    let ingredient_list = "";
    for (let i = 0; i < json['ingredients'].length; i++)
    {
      let obj = json['ingredients'];
      ingredient_list += obj[i]['name'] + "\n";
      console.log(obj[i]['name']);
    }
    document.getElementById("breakfastIngr").textContent = ingredient_list;
  }

  async function setIngrL(json) {
    console.log(JSON.stringify(json));
    let ingredient_list = "";
    for (let i = 0; i < json['ingredients'].length; i++)
    {
      let obj = json['ingredients'];
      ingredient_list += obj[i]['name'] + "\n";
      console.log(obj[i]['name']);
    }
    document.getElementById("lunchIngr").textContent = ingredient_list;
  }

    async function setIngrD(json) {
      console.log(JSON.stringify(json));
      let ingredient_list = "";
      for (let i = 0; i < json['ingredients'].length; i++)
      {
        let obj = json['ingredients'];
        ingredient_list += obj[i]['name'] + "\n";
        console.log(obj[i]['name']);
      }
      document.getElementById("dinnerIngr").textContent = ingredient_list;
    }