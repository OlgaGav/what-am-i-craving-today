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

    // add eventListener for [Restaurant] button with eventListener. On click search restaurant with keyword equal meal name
    let restaurantBtn = document.getElementById("restaurant-search-button");
    restaurantBtn.addEventListener("click", function() {
        show_restaurant(mealName)
    });

    // adding eventListener for [Watch Tutorial] button
    let watchTutorialBtn = document.getElementById("watch-tutorial-button");
    watchTutorialBtn.addEventListener("click", function() {
        watchVideo(videoUrl)
    });
}


function watchVideo(url) {
    window.open(url, '_blank');
}

// TODO: uncomment to test when search restaurants page will be implemented
function show_restaurant(mealName) {
    // let data = getRestaurantResults(keyWord);
    // renderResturantPage(data);
}

function getRestaurantResults(searchValue) {

}

function getRecipeById(idMeal) {

}

function getRecipeByName(userInput) {

}

function getRecipeByMainIngridient(userInput) {

}

function renderMultipleViewReciePage(arrayOfMeals) {

}

function oneOfMultiple(recipeObject) {
    
}

function renderResturantPage(data) {

}

let menuIcon = document.querySelector(".menu-hash");
let menuTab = document.querySelector(".menu-tab");
let menuTabRecipe = document.querySelector("#link-search-recipe");
let menuTabRestaurant = document.querySelector("#link-search-restaurant");
let menuRandomRecipe = document.querySelector("#link-random-page");

menuIcon.addEventListener("click", openMenuTab);
menuTabRecipe.addEventListener("click", recipeSearchContent);
menuTabRestaurant.addEventListener("click", restaurantSearchContent);
menuRandomRecipe.addEventListener("click", generateRandomRecipe);


function openMenuTab () {
    if(menuTab.style.display === "none") {
        menuTab.style.display = "block";
    } else {
        menuTab.style.display = "none";
    }

}

function recipeSearchContent () {
    document. getElementById("recipe-page").style.display = "block";
    document. getElementById("beginning-page").style.display = "none";
    document. getElementById("link-random-page").style.display = "block";
    menuTab.style.display = "none";
}

function restaurantSearchContent () {
    document.getElementById("restaurant-page").style.display = "block";
    document.getElementById("recipe-page").style.display = "none";
    document.getElementById("beginning-page").style.display = "none";
    document. getElementById("link-random-page").style.display = "none";
    document. getElementById("link-random-page").style.display = "block";
    menuTab.style.display = "none";
}

function generateRandomRecipe () {
    document. getElementById("beginning-page").style.display = "block";
    document. getElementById("link-random-page").style.display = "none";
    document. getElementById("recipe-page").style.display = "none";
    window.location.reload(true);
}
