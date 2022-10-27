let baseRecipeUrl = "https://www.themealdb.com/api/json/v1/1/"
let randomReceipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
let randomRecipeImage = document.getElementById("random-image");
let randomRecipeContent = document.getElementById("random-recipe");
let randomRecipeInstruction = document.getElementById("random-instruction");
let randomRecipeRestaurantBtn = document.getElementById("restaurant-search-button");
let randomRecipeWatchTutorialBtn = document.getElementById("watch-tutorial-button");
let searchRecipeInput = document.getElementById("search-recipe");
let searchRecipeBtn = document.getElementById("submit-button-recipe");
let foodList = document.getElementById("food-list");
let foodRecipeEl = document.getElementById("food-recipe");
let recipeInstructionEl = document.getElementById("recipe-instruction");
let recipePageWatchTutorialBtn = document.getElementById("watch-tutorial-button1");
let recipePageRestaurantBtn = document.getElementById("restaurant-search-button1");

//on page load random recipe is displayed by default
getRandomRecipe(randomReceipeUrl);

// Recipe Search page: event listener if user wants to pres enter after input
searchRecipeInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Trigger the 'Search' button element with a click
      searchRecipeBtn.click();
    }
  });

// Recipe Search page: event listener to show recipes when user click [Search] button
searchRecipeBtn.addEventListener('click', function() {
    let userSearchValue = searchRecipeInput.value;
    userSearchValue.trim();
    if (userSearchValue.length>0){
      getRecipeByMainIngredient(userSearchValue);
    }
})

function getRandomRecipe(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => renderRandomRecipePage(data.meals[0]));
}

// Render 'One Recipe' page, used for randome recipe and when user search by meal name
function renderRandomRecipePage(data) {
    console.log(data);
    let mealName = data.strMeal;
    let imageUrl = data.strMealThumb;
    let videoUrl = data.strYoutube;
    let srcUrl = data.strSource;
    let ingredientsArray =[];
    let ingredientMeasuresArray =[];
    let instruction = data.strInstructions;
    console.log(instruction);

    for (let i=0; i<20; i++) {
       let value = data["strIngredient"+(i+1)];
        if (!value) {
            break;
        }
        ingredientsArray[i] = value;
     }
     for (let i=0; i<20; i++) {
        let value = data["strMeasure"+(i+1)];
         if (!value) {
             break;
         }
        ingredientMeasuresArray[i] = value;
      }

    // add image to layout, element with id="random-image"
    let imageEl = document.createElement("img");
    imageEl.src = imageUrl;
    imageEl.setAttribute("alt", "image of "+data.strMeal);
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

    // if missing video on Youtube, user will be redirected to source page of the recipe
    for (let i=0; i<ingredientsArray.length; i++) {
        let ingredient = ingredientsArray[i] +" - "+ ingredientMeasuresArray[i];
        let ingredientEl = document.createElement("li");
        ingredientEl.textContent = ingredient;
        recipeIngredientsEl.appendChild(ingredientEl);
    }
    
    // add instrunctions how to cook
    if (instruction.length >0) {
        randomRecipeInstruction.textContent = instruction;
    }
    

    // add eventListener for [Restaurant] button with eventListener. On click search restaurant with keyword equal meal name
    randomRecipeRestaurantBtn.addEventListener("click", function() {
        show_restaurant(mealName);
    });

    // adding eventListener for [Watch Tutorial] button
    randomRecipeWatchTutorialBtn.addEventListener("click", function() {
        // watchVideo(videoUrl)
        if (videoUrl === "") {
            watchVideo(videoUrl);
        } else {
            watchVideo(srcUrl);
        }
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

// function call API to get recipe deatils and render results on the right hand side pane
function getRecipeById(idMeal) {
    let url = baseRecipeUrl+"lookup.php?i="+idMeal;
    console.log("url",url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let recipeData = data.meals[0];
        renderRecipe(recipeData);
    });
}

function getRecipeByName(userInput) {

}

// API call to get data for recipe
function getRecipeByMainIngredient(userInput) {
    let url = baseRecipeUrl+"filter.php?c="+userInput;
    console.log("search recipes by link ",url);
    fetch(url)
    .then(res => res.json())
    .then(data => renderMultipleViewRecipePage(data));
}

// input for this function search results from API of meal recipes by term from user search input
// it render list of meal names to the left hand side pane
// and call function to show the details of the first recipe
function renderMultipleViewRecipePage(searchResults) {
    foodList.innerHTML="";
    var foundRecipes = searchResults.meals;
    if (foundRecipes === null) {
        console.log("no results found");
        foodList.textContent = "No result found for the search by '' word. Try to search by other ingredient.";
        return;
    }
    console.log(foundRecipes);
    let listRecipesContainer = document.createElement("ul");
    foodList.appendChild(listRecipesContainer);
    for (let i=0; i<foundRecipes.length; i++) {
        let recipeId = foundRecipes[i].idMeal;
        let recipeEl = document.createElement("li");
        recipeEl.className = "results-item";
        listRecipesContainer.appendChild(recipeEl);
        recipeEl.textContent=foundRecipes[i].strMeal;
        recipeEl.setAttribute("data-idMeal", recipeId);
        recipeEl.onclick = () => getRecipeById(recipeId);
    }
    foodRecipeEl.textContent = "Select recipe from the list on the left";
}

// this function as input get Object with all recipe properties
// Function rendering recipe on the right side pane in section with id="food-recipe"
function renderRecipe(recipeData) {
    console.log("recipedata: ", recipeData);
    foodRecipeEl.innerHTML = "";
    let recipeName = recipeData.strMeal;
    let recipeIngredientsArray = [];
    let recipeIngredientsMeasuresArray = [];
    let recipeInstruction = recipeData.strInstructions;
    let recipeImageUrl = recipeData.strMealThumb;
    let recipeVideoUrl = recipeData.strYoutube;
    let recipeSrcUrl = recipeData.strSource;
    for (let i=0; i<20; i++) {
        let value = recipeData["strIngredient"+(i+1)];
         if (!value) {
             break;
         }
        recipeIngredientsArray[i] = value;
      }
      for (let i=0; i<20; i++) {
        let value = recipeData["strMeasure"+(i+1)];
         if (!value) {
             break;
         }
         recipeIngredientsMeasuresArray[i] = value;
      }
    let recipeNameEl = document.createElement("h3");
    recipeNameEl.textContent = recipeName;
    foodRecipeEl.appendChild(recipeNameEl);

    // add image of the meal
    let imageEl = document.createElement("img");
    imageEl.src = recipeImageUrl;
    imageEl.setAttribute("alt", "image of "+recipeName);
    foodRecipeEl.appendChild(imageEl);

    let recipeIngrsList = document.createElement("ul");
    foodRecipeEl.appendChild(recipeIngrsList);
    for (let i=0; i<recipeIngredientsArray.length; i++) {
        let ingredient = recipeIngredientsArray[i] +" - "+ recipeIngredientsMeasuresArray[i];
        let ingredientLi = document.createElement("li");
        ingredientLi.textContent = ingredient;
        recipeIngrsList.appendChild(ingredientLi);
    }
    recipeInstructionEl.textContent = recipeInstruction;

    recipePageWatchTutorialBtn.addEventListener('click', () => {
        if (recipeVideoUrl === "") {
            watchVideo(recipeSrcUrl);
        } else {
            watchVideo(recipeVideoUrl);
        }  
    })
     // add eventListener for [Restaurant] button with eventListener. On click search restaurant with keyword equal meal name
    recipePageRestaurantBtn.addEventListener("click", function() {
         show_restaurant(mealName);
     });
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
    menuTab.style.display = "none";
}

function restaurantSearchContent () {
    document.getElementById("restaurant-page").style.display = "block";
    document.getElementById("recipe-page").style.display = "none";
    document.getElementById("beginning-page").style.display = "none";
    document. getElementById("link-random-page").style.display = "block";
    menuTab.style.display = "none";
}

function generateRandomRecipe () {
    document. getElementById("beginning-page").style.display = "block";
    document. getElementById("recipe-page").style.display = "none";
    window.location.reload(true);
}


