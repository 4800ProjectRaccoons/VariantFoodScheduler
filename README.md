### Project FoodBites
1. **Problem the project tries to solve:**
    - College students/some people tend to eat the same thing every day, which may make them have boring diet, unhealthy food, and inactive lifestyle (go to the same places for food).
2. **Ideas and solutions:**
    - Use Spoonacular API to generate random meals that follow various options that the users pick.
    - We plan to use AWS server to deploy our website.
    - We draft the general interface of the website based on some concrete ideas of the things that the website can deliver to the users.
3. **Solution:**
    - Frontend (UI/UX):
        -  HTML, CSS, and Javascript
    - Backend:
        - Python Flask
    - Database/API:
        - Spoonacular API
    - Automation:
        - Use Github Actions to automatically setup the environments/dependencies, run the Python server, and clean-up after finish the job. As there is no equivalence of Maven of Java for Python and Python is flexible with its various libraries, we just run the Python main.py directly.
3. **Final product:**
    - Deployed website link: http://www.randombites.us:8080/
    - The website successfully generates random meals for breakfast, lunch, and dinner based on users' options regarding maximum calories choice, dietary patterns, and intolerances. The solution fulfills the initial proposed problem of boring diets of some students.