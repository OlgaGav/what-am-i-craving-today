let randomReceipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
let randomRecipeImage = document.getElementById("random-image");
let randomRecipeContent = document.getElementById("random-recipe");

getRandomRecipe(randomReceipeUrl);

function getRandomRecipe(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => renderOneRecipePage(data));
}

// render random recipe in 
function renderOneRecipePage(data) {
    console.log(data);
    let mealName = data.meals[0].strMeal;
    let imageUrl = data.meals[0].strMealThumb;
    let videoUrl = data.meals[0].strYoutube;
    let ingredientsArray =[];

    for (let i=0; i<20; i++) {
        let value = data.meals[0]["strIngredient"+(i+1)];
        if (!value) {
            break;
        }
        ingredientsArray[i] = value;
     }

    // add image to layout, element with id="random-image"
    let imageEl = document.createElement("img");
    imageEl.src = imageUrl;
    imageEl.setAttribute("alt", "image of "+data.meals[0].strMeal);
    randomRecipeImage.appendChild(imageEl);

    // add random recipe content to layout, element with id="random-recipe"
    let recipeEl = document.createElement("div");
    randomRecipeContent.appendChild(recipeEl);

    // add meal name
    let recipeHeader = document.createElement("h3");
    recipeHeader.textContent = mealName;
    recipeEl.appendChild(recipeHeader);

    //  add ingidients on layout
    let recipeIngredientsEl = document.createElement("ul");
    recipeEl.appendChild(recipeIngredientsEl);
    ingredientsArray.forEach(element => {
        let ingredientEl = document.createElement("li");
        ingredientEl.textContent = element;
        recipeIngredientsEl.appendChild(ingredientEl);
    })

    // add <hr>
    let separatorEl = document.createElement("hr");
    recipeEl.appendChild(separatorEl);

    // add [Restaurant] button with eventListener. On click search restaurant with keyword equal meal name
    let restaurantBtn = document.createElement("button");
    restaurantBtn.type = "button";
    restaurantBtn.textContent = "Restaurant";
    recipeEl.appendChild(restaurantBtn);
    restaurantBtn.addEventListener("click", show_restaurant(mealName));

    // add [Watch Tutorial] button
    let watchTutorialBtn = document.createElement("button");
    watchTutorialBtn.type = "button";
    watchTutorialBtn.textContent = "Watch Tutorial";
    recipeEl.appendChild(watchTutorialBtn);
    watchTutorialBtn.addEventListener("click", watchVideo(videoUrl));
}


function watchVideo(url) {
    window.open(url, '_blank');
}

// TODO: uncomment to test when search restaurants page will be implemented
function show_restaurant(mealName) {
    // let data = getRestaurantResults(keyWord);
    // renderResturantPage(data);
}