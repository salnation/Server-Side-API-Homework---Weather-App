// this is the API key the I was given when I registered with Open Weather API
var APIKey = "ef968294affe4e3e77f201aa1cac219c";

var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";

// Array of cities that have been previously been search stored in localStorage 

// clicking on a city in the search history will present the user with current and future conditions for that city

var listOfSearchedCities = [];

// get the list of searched cities from localStorage utilizing JSON and getItem from localStorage

var getSeachedCitiesFromLS = JSON.parse(localStorage.getItem("searched-cities"));
if (getSeachedCitiesFromLS !== null) {
  getSeachedCitiesFromLS.forEach(function(city) {city.toUpperCase();});
  listOfSearchedCities = getSeachedCitiesFromLS;  
}

// jQuery retrieve document and diplay the list of searched cities - jumpt to a recently searched for city 

$(document).ready(function(){
  displayCities(listOfSearchedCities);
  if (getSeachedCitiesFromLS !== null) {
    var lastCity = listOfSearchedCities[0];
    searchCity(lastCity);
  }
});

// The jQuery powered javascript has be created for the search button and the search input in the index.html 
// must work with the parameters of the openWeatherAPI

$("#search-btn").on("click", function() {
  event.preventDefault();
  clearDisplayedWeatherInfo()
  resetGlobalVariables()
  var cityName = $("input").val().toUpperCase().trim();
  $("#search-input").val("");
  searchCity(cityName);

  // Using JSON .stringify method 

  if (cityName !== ""&& listOfSearchedCities[0] !== cityName) {
    listOfSearchedCities.unshift(cityName);
    localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));
    if (listOfSearchedCities.length === 1) {
      $("#searched-cities-card").removeClass("hide");
    }

    console.log($("ul#searched-cities-list a").length);
    if ($("ul#searched-cities-list a").length >= 5) {
      ($("ul#searched-cities-list a:eq(4)").remove());
    }
    $("#searched-cities-list").prepend(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
    <li>${cityName}</li>
    </a>`);
  }
});

// Reset the displayed weather info, the global variables and the searched cities
$(document).on("click", ".list-group-item", function() {
  var cityName = $(this).text();
  clearDisplayedWeatherInfo();
  resetGlobalVariables();
  searchCity(cityName);
});


// adding the function for displayCurrentWeather - variables needed to be added to the function include the card heading, the weather image, the temperature, humidity, wind speed and uv index 
// sets the path to attain the values for the following variables
function displayCurrentWeather() {
  var cardDiv = $("<div class='container border bg-light'>");
  var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
  var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
  cardHeader.append(weatherImage);
  var temperatureEl = $("<p>").text("Temperature: " + tempF+ " ºF");
  var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
  var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
  var uvIndexEl = $("<p>").text("UV Index: ");
  var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color", getColorCodeForUVIndex(uvIndexValue)); 
    uvIndexEl.append(uvIndexValueEl);
    cardDiv.append(cardHeader);
    cardDiv.append(temperatureEl);
    cardDiv.append(humidityEl);
    cardDiv.append(windSpeedEl);
    cardDiv.append(uvIndexEl);
      $("#current-weather-conditions").append(cardDiv);
}

// Next I will create a function for the day forcast in the area of the user's choice - variable to be included are an image icon, the card header and card title, the card image and card text under the image, the min and max temp and the humidity 
function displayDayForeCast() { 
  var imgEl = $("<img>").attr("src", iconurl);  
  var cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
  var cardBlockDiv = $("<div>").attr("class", "card-block");
  var cardTitleDiv = $("<div>").attr("class", "card-block");
  var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
  var cardTextDiv = $("<div>").attr("class", "card-text");
  var minTempEl = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
  var maxTempEl = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
  var humidityEl = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");

    cardTextDiv.append(imgEl);
    cardTextDiv.append(minTempEl);
    cardTextDiv.append(maxTempEl);
    cardTextDiv.append(humidityEl);
    cardTitleDiv.append(cardTitleHeader);
    cardBlockDiv.append(cardTitleDiv);
    cardBlockDiv.append(cardTextDiv);
    ardEl.append(cardBlockDiv);
      $(".card-deck").append(cardEl);
}


// next function will be a deck header for when the user clicks the option for the 5 day forecast in the area 

function addCardDeckHeader() {
  deckHeader = $("<h4>").text("5-Day Forecast").attr("id", "card-deck-title");
  deckHeader.addClass("pt-4 pt-2");
  $(".card-deck").before(deckHeader);
}

// after this the weather info that is currently displayed for the user must be cleared with another function clearDisplayedWeatherInfo

function clearDisplayedWeatherInfo() {
  $("#current-weather-conditions").empty();
  $("#card-deck-title").remove();
  $(".card-deck").empty();
}

// I will then allow the user to view the cities that they have searched during their visit to the page. This will be done calling the searched-cities-list id for the cities list.

function displayCities(citiesList) {
  $("#searched-cities-card").removeClass("hide");
  var count = 0;
  citiesList.length > 5 ? count = 5 : count = citiesList.length
  for (var i=0; i < count; i++) {
    $("#searched-cities-list").css("list-style-type", "none");
    $("#searched-cities-list").append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
    <li>${citiesList[i]}</li>
    </a>`);
  }
}

// new function to create to retrieve the data color code for the UV index from OpenWeatherAPI database

function getColorCodeForUVIndex(uvIndex) {
  var uvIndexValue = parseFloat(uvIndex);
  var colorcode = "";
  if (uvIndexValue <= 2) {
    colorcode = "#00ff00";
  }
  else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
    colorcode = "#ffff00";
  }
  else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
    colorcode = "#ffa500";
  }
  else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
    colorcode = "#9e1a1a";
  }
  else if (uvIndexValue > 10) {
    colorcode = "#7f00ff";
  }
  return colorcode;
}

// I will have to reset all of the variables at this point 

function resetGlobalVariables() {
  city = "";
  currentDate = "";
  tempF = "";
  humidityValue = "";
  windSpeed = "";
  uvIndexValue = "";
  latitude = "";
  longitude = "";
  minTempK = "";
  maxTempK = "";
  minTempF = "";
  maxTempF = "";
  dayhumidity = "";
  currentWeatherIconCode = "";
  currentWeatherIconUrl = "";
  iconcode = "";
  iconurl = "";
  country = "";
}

// create new function called searchCity that will call the openWeatherAPI query URL to retrieve the weather data for that city

// search for a city and presented with current and future conditions for that city and that city is added to the search history

function searchCity(cityName){
  // URL to query the database
  console.log(cityName);
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
  cityName + "&appid=" + APIKey;
 
  // AJAX call to the OpenWatherAPI
  $.ajax({
    url: queryURL,
    method: "GET"
  })

// the data that is retreived by the AJAX and openWeatherAPI above has to be stored somewhere 

// store all of the retrieved data inside of an object called "response"
.then(function(response) {
  var result = response;
  console.log(result);
  city = result.name.trim();
 currentDate = moment.unix(result.dt).format("l");
 console.log(currentDate);
  var tempK = result.main.temp;
  // Converts the temp to Kelvin with the below formula
  tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(1);
  humidityValue = result.main.humidity;
  windSpeed = result.wind.speed;
  currentWeatherIconCode = result.weather[0].icon;
  currentWeatherIconUrl = "https://openweathermap.org/img/w/" + currentWeatherIconCode + ".png";
  var latitude = result.coord.lat;
  var longitude = result.coord.lon;
  var uvIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
  $.ajax({
    url: uvIndexQueryUrl,
    method: "GET"
  })
  .then(function(response) {
    uvIndexValue = response.value;
    displayCurrentWeather()

// r etrieves the 5-Day forcast from openWeatherAPI using again the .AJAX

// viewing the future weather conditions for that city will present the user with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
     $.ajax({
       url: fiveDayQueryUrl,
       method: "GET"
     })
     .then(function(response) {
       var fiveDayForecast = response.list;
       addCardDeckHeader()
       for (var i=0; i < 5; i++) {
         iconcode = fiveDayForecast[i].weather[0].icon;
         iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        dateValue = moment.unix(fiveDayForecast[i].dt).format('l');
         minTempK = fiveDayForecast[i].temp.min;
         minTempF =  ((minTempK - 273.15) * 1.80 + 32).toFixed(1);
         maxTempK = fiveDayForecast[i].temp.max;
         maxTempF =  (((fiveDayForecast[i].temp.max) - 273.15) * 1.80 + 32).toFixed(1);
         dayhumidity = fiveDayForecast[i].humidity;
         displayDayForeCast()
       } 
     });      
   }); 
 });
}