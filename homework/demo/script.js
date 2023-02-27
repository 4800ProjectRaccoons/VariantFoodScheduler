function getFood() {
    console.log("Searching for food");
    // grab input value
    var input = $('#cal_input').val();
    console.log("cal: " + input);
  
    // call the search server and get the result
    $.ajax({
      url: "http://127.0.0.1:5000/randomize/" + input,
      success: function(res) {
        console.log(res);
  
        $("#result_table").empty();
        $("#result_table").append("<tr> <th>Name</th><th>Price</th><th>Calories</th></tr>")
        
        var foodList = JSON.parse(res);
        for(var i = 0; i < foodList.length; i++) {
          console.log(foodList[i].name);
          console.log(foodList[i].price);
          var row_html_str = "<tr><td>" + foodList[i].name + "</td><td>" + foodList[i].price + "</td><td>" + foodList[i].calories + "</td></tr>"
          $('#result_table').append(row_html_str)
        }
        // render the result in the list
  
      },
      error: function(error) {
        console.log(error.Message);
      }
    });
  }