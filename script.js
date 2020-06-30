var APIKey = "";

// psuedo think of the variables that need to be created - eg. humidity, uv index, current temp, city, country etc..

let country = "";
let humidty = "";
let city = "";
let uvIndex = "";
let longitude = "";
let latitude = "";
let windSpeed = "";
let tempF = "";
let tempC = "";
let windSpeed = "";

// Array of cities that have been previously been search stored in localStorage 
var listOfSearchedCities = [];

// get the list of searched cities from localStorage utilizing JSON and getItem from localStorage
var getSearchedCities = JSON.parse(localStorage.getItem("searched-cities"));
if (getSearchedCities !== null) {
    getSearchedCities.array.forEach(function(city));
    listOfSearchedCities = getSearchedCities;
    }

// jQuery retrieve document and diplay the list of searched cities - jumpt to a recently searched for city 

$(document).ready(function(){
  displayCities(listOfSearchedCities);
  if (getSearchedCities !== null) {
    var prevCity = listOfSearchedCities[0];
    searchCity(prevCity);
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
}

if (cityName !== "" && listOfSearchedCities[0] !== cityName) {
  listOfSearchedCities.unshift(cityName);
  localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));
  if (listOfSearchedCities.length === 1) {
    $("#searchedcities-card").removeClass("hide");
  }

  console.log($("ul#searchedcities-list a").length);
  if ($("ul#searchedcities-list a").length >= 5) {
      ($("ul#searchedcities-list a:eq(4").remove());
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
function displayCurrentWeather() {
  var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
  var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
  var uvIndex = $("<p>").text("UV Index: ");
  // temperature in celcius 
  var temperatureC = $("<p>").text("Temperature: " + tempC+ " ºF");
  // temperature in farenheit 
  var temperatureF = $("<p>").text("Temperature: " + tempF+ " ºF");
  // wind speed is in miles per hour 
  var windSpeed = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
  var cardDiv = $("<div class='container border bg-light'>");
  var humidity = $("<p>").text("Humidity: " + humidityValue + "%");
  cardDiv.append(cardHeader);
  cardDiv.append(temperatureC);
  cardDiv.append(temperatureF);
  cardDiv.append(humidity);
  cardDiv.append(windSpeed);
  cardDiv.append(uvIndex);
  $("#current-weather-conditions").append(cardDiv);
}

// Next I will create a function for the day forcast in the area of the user's choice - variable to be included are an image icon, the card header and card title, the card image and card text under the image, the min and max temp and the humidity 
var cardDiv = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
var cardBlockDiv = $("<div>").attr("class", "card-block");
var cardTitleDiv = $("<div>").attr("class", "card-block");
var cardTextDiv = $("<div>").attr("class", "card-text");
var humidity = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");
var minTempF = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
var maxTempF = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
var minTempC = $("<p>").text("Min Temp: " + minTempC + " ºC").css("font-size", "0.60rem");
var maxTempC = $("<p>").text("Max Temp: " + maxTempC + " ºC").css("font-size", "0.60rem");
var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
cardTextDiv.append(img);
cardTextDiv.append(minTempF);
cardTextDiv.append(maxTempF);
cardTextDiv.append(minTempC;
cardTextDiv.append(maxTempC);
cardTextDiv.append(humidity);
cardTitleDiv.append(cardTitleHeader);
cardBlockDiv.append(cardTitleDiv);
cardBlockDiv.append(cardTextDiv);
cardEl.append(cardBlockDiv);
$(".card-deck").append(cardEl);
}

// next function will be a deck header for when the user clicks the option for the 5 day forecast in the area 



// after this the weather info that is currently displayed for the user must be cleared with another function clearDisplayedWeatherInfo