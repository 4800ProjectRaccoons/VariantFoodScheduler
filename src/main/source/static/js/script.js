async function getFood() {
    var api_key='1860d9cb5fb5432d894efb7ec63f484b';
    
    console.log("Searching for food");
    // grab input value

    var input1 = document.querySelector('#cal_input1').value;
    var input2 = document.querySelector('#cal_input2').value;
    var input3 = document.querySelector('#cal_input3').value;

    console.log("calories: " + input1 + ", " + input2 + ", " + input3);
  
    // call the search server and get the result
    $.ajax({
      //url: "http://127.0.0.1:8080/randomize/" + input1 + '/' + input2 + '/' + input3,
      url: "http://ec2-3-128-204-114.us-east-2.compute.amazonaws.com:8080/randomize/" + input1 + '/' + input2 + '/' + input3,
      success: function(res) {
        console.log(res);
        
        var food = JSON.parse(res);

        var breakfast_title = food[0]["title"];
        var breakfast_cal = food[0]["calories"];
        var breakfast_img = "https://spoonacular.com/recipeImages/" + food[0]["id"] + "-" + "556x370" + ".jpg";

        var lunch_title = food[1]["title"];
        var lunch_cal = food[1]["calories"];
        var lunch_img = "https://spoonacular.com/recipeImages/" + food[1]["id"] + "-" + "556x370" + ".jpg";

        var dinner_title = food[2]["title"];
        var dinner_cal = food[2]["calories"];
        var dinner_img = "https://spoonacular.com/recipeImages/" + food[2]["id"] + "-" + "556x370" + ".jpg";

        
        //ingredients
        var ingr = "https://api.spoonacular.com/recipes/" + food[0]["id"] + "/ingredientWidget.json" + "?apiKey=" + api_key;
        fetch(ingr)
        .then(response => response.json())
        .then(json => setIngr(json))
        
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
  async function setIngr(json) {
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