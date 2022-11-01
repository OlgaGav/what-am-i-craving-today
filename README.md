# What are you craving today?

## Introduction

The Webpage that we have created is designed for an everyday use. this page will be a tool for users who like to explore food that they havent tasted before, and will also allow the user to recreate food with given instruction and recipes. This webpage helps everyday users to search for food recipes and how to make it, as well as searching for restaurants locations. We also implemented giving user a choice to generate a random recipe instead for searching for them, giving the experience to try out new food.

## Description

The webpage is structured as below, with menu bar to help easy navigations.

1. Random recipe
   This webpage contains a landing page where we implemented generating random image and random recipes and will continue generating different ones whenever user reloads the page.

2. Search recipe
   Searching recipe include sections for food list, recipe list, and recipe instruction.
   Inside the recipe list section, there are two buttons: 1) Restaurant 2) Watch tutorial. The restaurant button will re-direct user to "Search restaurant" page to find nearby restaurants, and the watch tutorial buttton will re-direct user to watch tutorial on youtube.

3. Search restaurant
   User can search restraunts nearby including its address, customer review, type of service and external page link to the yelp page.
   From the "Restaurant searched history" button, user can check the previous search history.

4. Remark
   Both Search Recipe and Search Restaurant include a search bar, search button, and clear button.

### 'Search Restaurant' page

Current version allow search of restaurants based on the user location, around ~ 2.5 miles (4km).

**Note:** Getting user physical location comes under user privacy. HTML5 Geolocation API will always grant permission from the user to check geolocation. If a user allows, geolocation will work, else geolocation will be blocked.

![Sceenshot of the notification which request user to allow acess to location.](assets\images\access-location-request-window.png)

## URL

**Deployed application:** https://olgagav.github.io/what-am-i-craving-today/
**GitHb Respository:** https://github.com/OlgaGav/what-am-i-craving-today

## Screenshots

<img src="./images/landing-page.png />

## Credits

Robert Wijtman (Instructor), Bootcamp Modules, w3schools.com, stackoverflow.com, Bulma, Yelp, YouTube, JP Padilla, Minjoo Park, Olga Gavrushenko, Yesica Ortiz, Jose Ruiz.

## License

MIT License

Copyright (c) 2022 JP Padilla, Minjoo Park, Olga Gavrushenko, Yesica Ortiz, Jose Ruiz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
