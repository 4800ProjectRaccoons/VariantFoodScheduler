function getFood() {
    console.log("Searching for food");
    // grab input value
    //var input = $('#cal_input').val();
    var input = document.querySelector('#cal_input').value;
    console.log("cal: " + input);
  
    // call the search server and get the result
    $.ajax({
      url: "http://127.0.0.1:8080/randomize/" + input,
      //url: "http://ec2-3-128-204-114.us-east-2.compute.amazonaws.com:8080/randomize/" + input,
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

        var row_html_str = "<tr><td>" + food_title + "</td><td>" + food_calories + "</td></tr>";
        var row_html_img = "<tr><td><img src=" + food_img + "></td></tr>";
        $('#result_table').append(row_html_str);
        $('#result_table').append(row_html_img);

        // render the result in the list
  
      },
      error: function(error) {
        console.log(error.Message);
      }
    });
  }