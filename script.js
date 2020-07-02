// this is the API key the I was given when I registered with Open Weather API
var APIKey = "dd6aa1dc7480a9dd05920f7b6ee1ffac"

var city = "";
var currentDate = "";
var tempF = "";  //current temperature
var humidtyValue = ""; 
var windSpeed = ""; // current wind speed
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempF = "";
var maxTempF = "";
var minTempK = ""; // Had to change celecius to K for conversion
var maxTempK = "";

//Next set of variables to add include humidity, and the weather icons and I forgot to add the variable to country

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

var getSearchedCitiesFromLS = JSON.parse(localStorage.getItem("searched-cities"));
if (getSearchedCitiesFromLS !== null) {
    getSearchedCitiesFromLS.forEach(function(city) {city.toUpperCase();
    listOfSearchedCities = getSearchedCitiesFromLS;
    }

// jQuery retrieve document and diplay the list of searched cities - jumpt to a recently searched for city 

$(document).ready(function(){
  displayCities(listOfSearchedCities);
  if (getSearchedCitiesFromLS !== null) {
    var lastCity = listOfSearchedCities[0];
    searchCity(lastCity);

  }

});

// The jQuery powered javascript has be created for the search button and the search input in the index.html 
// must work with the parameters of the openWeatherAPI

$("search-btn").on("click",function() {
  event.preventDefault();
  clearDisplayedWeatherInfo()
  resetGlobalVariables()
  // The val() method returns or sets the value attribute of the selected elements
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
      ($("ul#searched-cities-list a:eq(4").remove());
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
  // variable I forgot to add** var uvIndexValueEl
  var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color", getColorCodeForUVIndex(uvIndexValue)).addClass("text-white");
  
  uvIndexEl.append(uvIndexValueEl);
  cardDiv.append(cardHeader);
  cardDiv.append(temperatureEl);
  cardDiv.append(humidityEl);
  cardDiv.append(windSpeedEl);
  cardDiv.append(uvIndexEl;
  $("#current-weather-conditions").append(cardDiv);
}

// Next I will create a function for the day forcast in the area of the user's choice - variable to be included are an image icon, the card header and card title, the card image and card text under the image, the min and max temp and the humidity 
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
cardTextDiv.append(minTempEl;
cardTextDiv.append(maxTempFEl;
cardTextDiv.append(humidityEl);
cardTitleDiv.append(cardTitleHeader);
cardBlockDiv.append(cardTitleDiv);
cardBlockDiv.append(cardTextDiv);
cardEl.append(cardBlockDiv);
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
  // for statement that we learned and used in pervious assignment
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
  tempF = ""; // temperature in farenheit - must convert
  windSpeed = "";
  uvIndexValue = "";
  minTempK = "";
  maxTempK = "";
  minTempF = "";
  maxTempF = "";
  dayHumidity = "";
  currentWeatherIconCode = "";
  currentWeatherIconUrl = "";
  iceoncode = "";
  iconurl = "";
  country = "";
  latitude = "";
  longitude = "";
}

// create new function called searchCity that will call the openWeatherAPI query URL to retrieve the weather data for that city

// search for a city and presented with current and future conditions for that city and that city is added to the search history
function searchCity(cityName){
  // build URL to query the database
  console.log(cityName);

// The next steps will include the new topics we learned this week in class. building the URL to query the openWeatherAPI database

// viewing current weather conditions for that city will produce the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
 cityName + "&appid=" + APIKey;

// Then I will have to run AJAX to send the call to the openWeatherAPI database

// run the AJAX call to the OpenWatherAPI
$.ajax({
  // run thr AJAX call
  url: queryURL,
  method: "GET"
})

// the data that is retreived by the AJAX and openWeatherAPI above has to be stored somewhere 

.then(function(response) {
  var result = response;
  console.log(result);
  city = result.name.trim();
}

// retreives the current date using moment.unix learned in the last unit and used for the pervious assignment

currentDate = moment.unix(result.dt).format("1");
console.log(currentDate);

// retreives windspeed and humidity 

humidityValue = result.main.humidity;
windSpeed = result.wind.speed;

// temperature conversion from K to F below

var tempK = result.main.temp;
   // Converts the temperature with the below formula
   tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(1);

// get results for the current weather from openWeatherMap API
currentWeatherIconCode = result.weather[0].icon;
   currentWeatherIconUrl = "https://openweathermap.org/img/w/" + currentWeatherIconCode + ".png";
   var latitude = result.coord.lat;
   var longitude = result.coord.lon;

// retrieve the data from openWeatherAPI for the unIndexQuery call using the URL and the method "GET"

// user can view the UV index and is presented with a color that indicates whether the conditions are favorable, moderate, or severe

// run the AJAX call to the OpenWatherAPI
var uvIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
   $.ajax({
     url: uvIndexQueryUrl,
     method: "GET"
   })

// r etrieves the 5-Day forcast from openWeatherAPI using again the .AJAX

// viewing the future weather conditions for that city will present the user with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
     $.ajax({
       // run the AJAX call to the OpenWatherAPI
       url: fiveDayQueryUrl,
       method: "GET"
     })

     .then(function(response) {
      var fiveDayForecast = response.list;
      addCardDeckHeader()
      for (var i=0; i < 5; i++) {
        iconcode = fiveDayForecast[i].weather[0].icon;
        iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
       //  dateValue = moment().tz(country + "/" + city).add(i, 'days').format('l');
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

