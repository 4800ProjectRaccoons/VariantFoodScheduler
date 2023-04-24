function getFood() {
    console.log("Searching for food");
    // grab input value

    var input1 = document.querySelector('#cal_input1').value;
    var input2 = document.querySelector('#cal_input2').value;
    var input3 = document.querySelector('#cal_input3').value;

    console.log("calories: " + input1 + ", " + input2 + ", " + input3);
  
    // call the search server and get the result
    $.ajax({
      //url: "http://127.0.0.1:8080/randomize/" + input1,
      url: "http://ec2-3-128-204-114.us-east-2.compute.amazonaws.com:8080/randomize/" + input1,
      success: function(res) {
        console.log(res);
  
        $("#result_table").empty();
        $("#result_table").append("<tr> <th>Name</th><th>Calories</th></tr>");
        
        console.log("parsing...")
        var food = JSON.parse(res);

        var food_title = food[0]["title"]
        var food_calories = food[0]["calories"]

        // image link
        var food_img = "https://spoonacular.com/recipeImages/" + food[0]["id"] + "-" + "556x370" + ".jpg";

        console.log(food_title);
        console.log(food_calories);
        console.log(food_img);

        // var row_html_str = "<tr><td>" + food_title + "</td><td>" + food_calories + "</td></tr>"
        // $('#result_table').append(row_html_str);

        document.getElementById("breakfastMeal").textContent = food_title;
        document.getElementById("breakfastCal").textContent = food_calories;
        document.getElementById("breakfastImg").src = food_img;
        document.getElementById("breakfastImg").style = "height: 200px; width: auto;";

        // render the result in the list
  
      },
      error: function(error) {
        console.log(error.Message);
      }
    });
  }