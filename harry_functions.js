function get_diet_pattern() {
    // 1. Display the selected dietary pattern
    const diet_pattern = document.getElementById("diet_pattern");

    mySelect.addEventListener("change", function() {
        const selected_diet = diet_pattern.value;
        console.log("Selected diet pattern: " + selected_diet);
    });
}