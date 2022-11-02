let baseRecipeUrl = "https://www.themealdb.com/api/json/v1/1/"
let randomReceipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
let randomRecipeImage = document.getElementById("random-image");
let randomRecipeContent = document.getElementById("random-recipe");
let searchRestaurantInput = document.getElementById("search-restaurants");
let searchRestaurantBtn = document.getElementById("submit-button-restaurant");
let randomRecipeInstruction = document.getElementById("random-instruction");
let randomRecipeRestaurantBtn = document.getElementById("restaurant-search-button");
let randomRecipeWatchTutorialBtn = document.getElementById("watch-tutorial-button");
let searchRecipeInput = document.getElementById("search-recipe");
let searchRecipeBtn = document.getElementById("submit-button-recipe");
let foodList = document.getElementById("food-list");
let foodImageE = document.getElementById("food-image");
let foodRecipeEl = document.getElementById("food-recipe");
let recipeInstructionEl = document.getElementById("recipe-instruction");
let restaurantInfoEl = document.getElementById("restaurant-information");
let restaurantList = document.getElementById("restaurant-list");
let restaurantImage = document.getElementById("restaurant-image");
let recipeClearInputBtn = document.getElementById("clear-button-recipe");
let restaurantClearInputBtn = document.getElementById("clear-button-restaurant");
let locationInputEl = document.getElementById("location");
let prevRestaurantClear = document.getElementById("restaurant-clear-button");
let prevSearches = document.querySelector(".previous-searches");
let previousRestaurant = document.querySelector("#previous-restaurant");
let savedRestaurants = JSON.parse(localStorage.getItem("data")) || [];
let historyStartPageEl = document.getElementById("history-start-page");
let historyRecipePageEl = document.getElementById("history-recipe-page");
let saveRandomRecipeBtn = document.getElementById("save-recipe-button");

//edit event listener to input search field
recipeClearInputBtn.addEventListener("click", function(){
    searchRecipeInput.value = "";
})
restaurantClearInputBtn.addEventListener("click", function(){
    searchRestaurantInput.value = "";
})

//on page load random recipe is displayed by default
getRandomRecipe(randomReceipeUrl);

// Restaurant Search page: event listener if user wants to pres enter after input
searchRestaurantInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Trigger the 'Search' button element with a click
      searchRestaurantBtn.click();
    }
  });

locationInputEl.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Trigger the 'Search' button element with a click
      searchRestaurantBtn.click();
    }
  });  

// Restaurant Search page: event listener to show Restaurants when user click [Search] button
searchRestaurantBtn.addEventListener('click', function() {
    let userSearchValue = searchRestaurantInput.value;
    let userLocationValue = locationInputEl.value;
    userSearchValue.trim();
    userLocationValue.trim();
    if (userLocationValue.length>0){
      getRestaurantsByInputLocation(userSearchValue, userLocationValue);
      //clear the input field after search
      searchRestaurantInput.value = "";
      locationInputEl.value = "";
    } else {
      getRestaurantsByUserLocation(userSearchValue);
      //clear the input field after search
      searchRestaurantInput.value = "";
    }
});
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
      //clear the input field after search
      searchRecipeInput.value = "";
    }
})

function getRandomRecipe(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => renderRandomRecipePage(data.meals[0]));
}

// Render 'One Recipe' page, used for random recipe and when user search by meal name
function renderRandomRecipePage(data) {
    let mealName = data.strMeal;
    let imageUrl = data.strMealThumb;
    let videoUrl = data.strYoutube;
    let srcUrl = data.strSource;
    let ingredientsArray =[];
    let ingredientMeasuresArray =[];
    let instruction = data.strInstructions;
    let currentRecipe = {
        idMeal: data.idMeal,
        name: mealName,
        imageUrl: imageUrl,
        srcUrl: srcUrl
    }

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
    let recipeEl = document.createElement("p");
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
    
    saveRandomRecipeBtn.addEventListener("click", function(){
        addRecipeToLocalStorage(currentRecipe);
        renderSavedRecipes(historyStartPageEl);    
    })

    renderSavedRecipes(historyStartPageEl);
}

function watchVideo(url) {
    window.open(url, '_blank');
}

function show_restaurant(mealName) {
    restaurantSearchContent();
    searchRestaurantInput.value = mealName;
    // disabled automatic search to allow user select Location
    // let data = getRestaurantsByUserLocation(mealName);
    // renderRestaurantPage(data);
}

function websiteOpenUrl(url) {
    window.open(url, '_blank');
}

// function get user's location in latitude and longitude and call function to fetch data with these values as parameter
function getRestaurantsByUserLocation(searchValue) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      let lat=pos.coords.latitude;
      let lon=pos.coords.longitude;
      let parameters = "&term="+searchValue+"&latitude="+lat+"&longitude="+lon;
      getRestaurantsWithParameters(parameters);
      });
    } else  { 
      console.log("Geolocation is not supported by this browser.");
    }
}

// function called when user provide city as location to search resturants
function getRestaurantsByInputLocation(searchValue, userLocationValue) {
    let parameters = "&term="+searchValue+"&location="+userLocationValue;
    getRestaurantsWithParameters(parameters);
}

function getRestaurantsWithParameters(parameters) {
    // variables declared in function to limit access outside the function
    const restaurantBaseUrl = "https://http-cors-proxy.p.rapidapi.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&locale=en_US&radius=4000";
    const bearer = 'Bearer YXuzaCORAsgE_YQF8PMgLZRMg_UiY_7DfpnCEhGS3DOcGLNNrDAYk8BnEDAyj62rfOlD9Z5DSlGPFkc-lXFN-8zVtK3j65-x6mlxxc2ua3TnIWOEQvoRUqCelBVXY3Yx';
    let searchUrl = restaurantBaseUrl+parameters;

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
            renderRestaurantPage(data.businesses);
        })
        .catch(error => console.log(error));
}

// function call API to get recipe deatils and render results on the right hand side pane
function getRecipeById(idMeal) {
    let url = baseRecipeUrl+"lookup.php?i="+idMeal;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let recipeData = data.meals[0];
        renderRecipe(recipeData);
    });
}

function getRecipeByName(userInput) {

}

// API call to get data by user input search term
function getRecipeByMainIngredient(userInput) {
    let url = baseRecipeUrl+"filter.php?i="+userInput;
    fetch(url)
    .then(response => response.json())
    .then(data => renderMultipleViewRecipePage(data))
    .catch(e => console.log(e));
}

// input for this function search results from API of meal recipes by term from user search input
// it render list of meal names to the left hand side pane
// and call function to show the details of the first recipe
function renderMultipleViewRecipePage(searchResults) {
    foodList.innerHTML="";
    var foundRecipes = searchResults.meals;
    if (foundRecipes === null) {
        foodList.textContent = "No result found. Try another search. Example: noodles, cabbage, chicken, lentils";
        return;
    }
    let listRecipesContainer = document.createElement("ul");
    foodList.appendChild(listRecipesContainer);
    for (let i=0; i<foundRecipes.length; i++) {
        let recipeId = foundRecipes[i].idMeal;
        let recipeEl = document.createElement("li");
        recipeEl.className = "is-clickable";
        listRecipesContainer.appendChild(recipeEl);
        recipeEl.textContent=foundRecipes[i].strMeal;
        recipeEl.setAttribute("data-idMeal", recipeId);
        recipeEl.onclick = () => getRecipeById(recipeId);
    }
    renderSavedRecipes(historyRecipePageEl);
}

// this function as input get Object with all recipe properties
// Function rendering recipe on the right side pane in section with id="food-recipe"
function renderRecipe(recipeData) {
    foodRecipeEl.innerHTML = "";
    let recipeName = recipeData.strMeal;
    let recipeIngredientsArray = [];
    let recipeIngredientsMeasuresArray = [];
    let recipeInstruction = recipeData.strInstructions;
    let recipeImageUrl = recipeData.strMealThumb;
    let recipeVideoUrl = recipeData.strYoutube;
    let recipeSrcUrl = recipeData.strSource;
    let currentRecipe = {
        idMeal: recipeData.idMeal,
        name: recipeName,
        imageUrl: recipeImageUrl,
        srcUrl: recipeSrcUrl
    }

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

      let recipeSep1 = document.createElement("hr");
      recipeSep1.className = "classic-style1";
      foodRecipeEl.appendChild(recipeSep1);

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

    let recipePageWatchTutorialBtn = document.createElement("button");
    recipePageWatchTutorialBtn.className = "waves-effect waves-light btn-small recipe-btns";
    recipePageWatchTutorialBtn.textContent = "Watch Tutorial";

    let recipePageRestaurantBtn = document.createElement("button");
    recipePageRestaurantBtn.className = "waves-effect waves-light btn-small recipe-btns";
    recipePageRestaurantBtn.textContent = "Restaurant";

    let recipeSaveBtn = document.createElement("button");
    recipeSaveBtn.className = "waves-effect waves-light btn-small recipe-btns";
    recipeSaveBtn.textContent = "Save Recipe";

    foodRecipeEl.appendChild(recipePageRestaurantBtn);
    foodRecipeEl.appendChild(recipePageWatchTutorialBtn);
    foodRecipeEl.appendChild(recipeSaveBtn);

    let recipeSep3 = document.createElement("hr")
    recipeSep3.className = "classic-style1";
    foodRecipeEl.appendChild(recipeSep3);

    recipePageWatchTutorialBtn.addEventListener('click', () => {
        if (recipeVideoUrl === "") {
            watchVideo(recipeSrcUrl);
        } else {
            watchVideo(recipeVideoUrl);
        }  
    })
     // add eventListener for [Restaurant] button with eventListener. On click search restaurant with keyword equal meal name
    recipePageRestaurantBtn.addEventListener("click", function() {
         show_restaurant(recipeName);
     });

    recipeSaveBtn.addEventListener("click", function(){
        addRecipeToLocalStorage(currentRecipe);
        renderSavedRecipes(historyRecipePageEl);
    })      
}

// Displays restaurants list w/ clickable content.
function renderRestaurantList (data) {
    restaurantList.innerHTML = "";
    let restaurantListEl = document.createElement("ul");
    restaurantList.appendChild(restaurantListEl);
    for(let i=0; i < data.length; i++) {
        let restaurantListLi = document.createElement("li");
        restaurantListLi.textContent = data[i].name;
        restaurantListEl.appendChild(restaurantListLi);
        restaurantListLi.className = "is-clickable";
        restaurantListLi.onclick = () => renderRestaurant(data[i]);

        restaurantListLi.addEventListener("click", (event) => {
            event.preventDefault();
            renderRestaurant(data[i]);
            let restaurant = restaurantListLi.textContent;
            if(savedRestaurants.indexOf(restaurant) == -1) {
               savedRestaurants.push(restaurant);
               var storeIt = document.createElement("li");
               storeIt.textContent = restaurant;
               document.getElementById("previous-restaurant").appendChild(storeIt);
               localStorage.setItem("data", JSON.stringify(savedRestaurants));
            }
       });
    }
}

    for(let i=0; i < savedRestaurants.length; i++) {
        var storeMe = document.createElement("li");
        storeMe.textContent = savedRestaurants[i];
        storeMe.className = "is-clickable";
        document.getElementById("previous-restaurant").appendChild(storeMe);

    }
    prevRestaurantClear.addEventListener("click", () => { 
        localStorage.removeItem("data", savedRestaurants);
        document.getElementById("previous-restaurant").innerHTML = ' ';
    });

// Displays restaurants information w/ image, name, address, ratings, service options, and phone number
function renderRestaurant(selectRestaurantData) {
    restaurantInfoEl.innerHTML = "";
    let restaurantName = selectRestaurantData.name;
    let restaurantSeparator = "./assets/images/menu-separator1.png";
    let restaurantImg = selectRestaurantData.image_url;
    let restaurantAddress = selectRestaurantData.location.display_address[0];
    let restaurantAddress1 = selectRestaurantData.location.display_address[1];
    let restaurantMethod = selectRestaurantData.transactions;
    let restaurantRatings = selectRestaurantData.rating;
    let restaurantPhone = selectRestaurantData.display_phone;
    let restaurantUrl = selectRestaurantData.url;

    let restaurantSep1 = document.createElement("img");
    restaurantSep1.src = restaurantSeparator;
    restaurantInfoEl.appendChild(restaurantSep1);

    let restaurantImageEl = document.createElement("img");
    restaurantImageEl.src = restaurantImg;
    restaurantImageEl.setAttribute("alt", "image of "+ restaurantName);
    restaurantInfoEl.appendChild(restaurantImageEl);

    let restaurantNameEl = document.createElement('h4');
    restaurantNameEl.textContent =restaurantName;
    restaurantInfoEl.appendChild(restaurantNameEl);

    let restaurantAddressEl = document.createElement('p');
    restaurantAddressEl.textContent = restaurantAddress;
    restaurantInfoEl.appendChild(restaurantAddressEl);

    let restaurantAddressEl1 = document.createElement('p');
    restaurantAddressEl1.textContent = restaurantAddress1;
    restaurantInfoEl.appendChild(restaurantAddressEl1);

    let restaurantRatingsEl = document.createElement('p');
    restaurantRatingsEl.textContent = restaurantRatings + " " + "stars";
    restaurantInfoEl.appendChild(restaurantRatingsEl);

    let restaurantMethodEl = document.createElement('p');
    restaurantMethodEl.textContent = "Type of Service:" + " " + restaurantMethod;
    restaurantInfoEl.appendChild(restaurantMethodEl);

    let restaurantPhoneEl = document.createElement('p');
    restaurantPhoneEl.textContent = restaurantPhone;
    restaurantInfoEl.appendChild(restaurantPhoneEl);

    let restaurantSep2 = document.createElement("img");
    restaurantSep2.src = restaurantSeparator;
    restaurantInfoEl.appendChild(restaurantSep2);

    let restaurantBtnEl = document.createElement('button');
    restaurantBtnEl.textContent = "Yelp Website";
    restaurantBtnEl.className = "waves-effect waves-light btn-small";
    restaurantInfoEl.appendChild(restaurantBtnEl);

    //add event listener when official website button is clicked, will take user to restaurants official website.
    restaurantBtnEl.addEventListener("click", (event) => {
        event.preventDefault(); 

        websiteOpenUrl(restaurantUrl);

   });
}

function renderRestaurantPage(restaurantData) {
    restaurantInfoEl.innerHTML = "";
    if (restaurantData.length===0){
        restaurantInfoEl.innerHTML = "No restaurant found by your search. Please try another location or another meal name.";
    }
    renderRestaurantList(restaurantData);
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }); 

document.addEventListener('DOMContentLoaded', function() {
    var elems1 = document.querySelectorAll('.sidenav1');
    M.Sidenav.init(elems1);
  }); 
//menu tab  functions

let menuTabRecipe = document.querySelector("#link-search-recipe");
let menuTabRestaurant = document.querySelector("#link-search-restaurant");
let menuRandomRecipe = document.querySelector("#link-random-page");
let slideOut = document.querySelector("#slide-out");


menuTabRecipe.addEventListener("click", recipeSearchContent);
menuTabRestaurant.addEventListener("click", restaurantSearchContent);
menuRandomRecipe.addEventListener("click", generateRandomRecipe);


function recipeSearchContent () {
    let imageUrl = "./assets/images/loader.gif";
        swal({
        icon: imageUrl,
        buttons: false,
        timer: 2500
    }).then (() => {
        document.getElementById("recipe-page").style.display = "block";
        document.getElementById("beginning-page").style.display = "none";
        document.getElementById("restaurant-page").style.display = "none";
    });
 }

//add function when "search recipe" is click, will take user to recipe page.
function restaurantSearchContent () {
    let imageUrl = "./assets/images/Yx9l.gif";
    swal({
        icon: imageUrl,
        buttons: false,
        timer: 2500
    }).then (() => {
        document.getElementById("restaurant-page").style.display = "block";
        document.getElementById("recipe-page").style.display = "none";
        document.getElementById("beginning-page").style.display = "none";
        document.getElementById("link-random-page").style.display = "block";
    })
  
 }

//add function when "search restaurant" is click, will take user to restaurant page.
function generateRandomRecipe () {
    let imageUrl = "./assets/images/random-gift.gif";
    swal({
        icon: imageUrl,
        buttons: false,
        timer: 3000
    }).then (() => {
        document.getElementById("beginning-page").style.display = "block";
        document.getElementById("recipe-page").style.display = "none";
        window.location.reload(true);
    })
 }


// save recipe to local storage
function addRecipeToLocalStorage(currentRecipe){
    if (currentRecipe===null || currentRecipe===undefined || currentRecipe==="") {
        console.log("function addRecipeToLocalStorage expect recipe object as a parameter");
        return;
    }
    let savedRecipes = JSON.parse(localStorage.getItem("recipe-history")) || [];
    // if (savedRecipes === null) {
    //     savedRecipes = [];
    // }

    for (let j=0; j<savedRecipes.length; j++) {
        if (savedRecipes[j].name === currentRecipe.name) {
            return;
        }
    }
    savedRecipes.push(currentRecipe);
    localStorage.setItem("recipe-history",JSON.stringify(savedRecipes));
}
// Render saved recipes if user has in localStorage saved recipes fom previous sessions
function renderSavedRecipes(historyEl) {
    historyEl.innerHTML="";
    let savedRecipes = JSON.parse(localStorage.getItem("recipe-history"));
    if (savedRecipes === null){
      return;
    }
    let pageHeader = document.createElement("h3");
    pageHeader.className = "Saved Recipies";
    pageHeader.textContent = "Saved recipies";
    historyEl.appendChild(pageHeader); 

    for (let i=0; i<savedRecipes.length; i++) {

        let recipeOneEl = document.createElement("div");
        recipeOneEl.className = "col s2";
        historyEl.appendChild(recipeOneEl);
    
        let recipeCardEl = document.createElement("div");
        recipeCardEl.className = "card";
        recipeOneEl.appendChild(recipeCardEl);

        let cardImageDiv = document.createElement("div");
        cardImageDiv.setAttribute("href", savedRecipes[i].srcUrl);
        cardImageDiv.className = "is-clickable";
        recipeCardEl.appendChild(cardImageDiv);
        
        let cardImage = document.createElement("img");
        cardImage.src = savedRecipes[i].imageUrl;
        cardImage.setAttribute("alt", "image of "+savedRecipes[i].name);
        recipeCardEl.appendChild(cardImage);

        let cardContentDiv = document.createElement("a");
        cardContentDiv.className = "card-content saved-recipies";
        cardContentDiv.setAttribute("href", savedRecipes[i].srcUrl);
        cardContentDiv.setAttribute("target", "_blank");
        cardContentDiv.textContent = savedRecipes[i].name;
        recipeCardEl.appendChild(cardContentDiv);
    }
}
