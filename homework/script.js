function changeName() {
    console.log("clicked");

    // 1. grab the input value
    var name = $('#name_input').val();
    console.log("name: " + name);

    // // 2. call the server and get the result
    // $.ajax({
    //     url: "http://127.0.0.1:5000/" + name,
    //     success: function(res) {
    //         console.log(res);
    //     },
    //     error: function(error) {
    //         // CORS
    //         console.log(error.Message);
    //     }
    //   });

    // // 3. render the result

    // $('#name').set(name);
}