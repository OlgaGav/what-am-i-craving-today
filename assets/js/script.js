let randomReceipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
let randomRecipeImage = document.getElementById("random-image");
let randomRecipeContent = document.getElementById("random-recipe");
let searchRestaurantInput = document.getElementById("search-restaurants");
let searchRestaurantBtn = document.getElementById("submit-button-restaurant");

getRandomRecipe(randomReceipeUrl);

// Restaurant Search page: event listener if user wants to pres enter after input
searchRestaurantInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Trigger the 'Search' button element with a click
      searchRestaurantBtn.click();
    }
  });

// Restaurant Search page: event listener to show Restaurants when user click [Search] button
searchRestaurantBtn.addEventListener('click', function() {
    let userSearchValue = searchRestaurantInput.value;
    userSearchValue.trim();
    if (userSearchValue.length>0){
      getRestaurantsByUserLocation(userSearchValue);
    }
})

function getRandomRecipe(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => renderOneRecipePage(data));
}

// render random recipe in 
function renderOneRecipePage(data) {
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



function getRestaurantsByUserLocation(searchValue) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      let userPosition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      getRestaurantsWithParameters(searchValue, userPosition);
      });
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}

function getRestaurantsWithParameters(searchValue, userPosition) {
    const restaurantBaseUrl = "https://http-cors-proxy.p.rapidapi.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&locale=en_US&radius=4000";
    const bearer = 'Bearer YXuzaCORAsgE_YQF8PMgLZRMg_UiY_7DfpnCEhGS3DOcGLNNrDAYk8BnEDAyj62rfOlD9Z5DSlGPFkc-lXFN-8zVtK3j65-x6mlxxc2ua3TnIWOEQvoRUqCelBVXY3Yx';
    let lat=userPosition.latitude;
    let lon=userPosition.longitude;
    let searchUrl = restaurantBaseUrl+"&term="+searchValue+"&latitude="+lat+"&longitude="+lon;
    
    const options = {
        method: 'GET',
        headers: {
            origin: '//api.yelp.com',
            'x-requested-with': '//api.yelp.com',
            'X-RapidAPI-Key': 'a7c1740288msh4f931a82f33f01cp12b670jsn5efd6e4938b9',
            'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
            Authorization: bearer,
            'Access-Control-Allow-Origin': 'api.yelp.com'
        }
    };
    
    fetch(searchUrl, options)
        .then(response => response.json())
        .then(data => {
            renderResturantPage(data.businesses);
        })
        .catch(err => console.error(err));
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
