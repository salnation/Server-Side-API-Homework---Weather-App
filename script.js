
var city = "";
var currentDate = "";
var tempF = "";
var humidtyValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempF = "";
var maxTempF = "";
var minTempC = "";
var maxTempC = "";

// Array of cities that have been previously been search stored in localStorage 
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
function displayCurrentWeather() {
  var cardDiv = $("<div class='container border bg-light'>");
  var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
  var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
  cardHeader.append(weatherImage);
  var temperatureEl = $("<p>").text("Temperature: " + tempF+ " ºF");
  var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
  var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
  var uvIndexEl = $("<p>").text("UV Index: ");
  
  cardDiv.append(cardHeader);
  cardDiv.append(temperatureC);
  cardDiv.append(temperatureF);
  cardDiv.append(humidity);
  cardDiv.append(windSpeed);
  cardDiv.append(uvIndex);
  $("#current-weather-conditions").append(cardDiv);
}

// Next I will create a function for the day forcast in the area of the user's choice - variable to be included are an image icon, the card header and card title, the card image and card text under the image, the min and max temp and the humidity 
var imgEl = $("<img>").attr("src", iconurl); 
var cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
var cardBlockDiv = $("<div>").attr("class", "card-block");
var cardTitleDiv = $("<div>").attr("class", "card-block");
var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
var cardTextDiv = $("<div>").attr("class", "card-text");
var minTempF = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
var maxTempF = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
var minTempC = $("<p>").text("Min Temp: " + minTempC + " ºC").css("font-size", "0.60rem");
var maxTempC = $("<p>").text("Max Temp: " + maxTempC + " ºC").css("font-size", "0.60rem");
var humidityEl = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");

cardTextDiv.append(imgEl);
cardTextDiv.append(minTempF);
cardTextDiv.append(maxTempF);
cardTextDiv.append(minTempC;
cardTextDiv.append(maxTempC);
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
  for (var i=0; i < count; i++) 
}

// The next steps will include the new topics we learned this week in class. building the URL to query the openWeatherAPI database
// I am pretty sure this is where the APIkey will have to go

var queryURL = "";

// Then I will have to run AJAX to send the call to the openWeatherAPI database

$.ajax({
  url: queryURL,
  method: "GET"
})

// the data that is retreived by the AJAX and openWeatherAPI above has to be stored somewhere 

.then(function(response) {
  var result = response;
  console.log(result);
  city = result.name.trim();
}

// retreives the current date using moment.unix
currentDate = moment.unix(result.dt).format("1");
console.log(currentDate);

// retreives windspeed and humidity 

humidityValue = result.main.humidity;
windSpeed = result.wind.speed;

// r etrieves the 5-Day forcast from openWeatherAPI using again the .AJAX

var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=" + APIKey + "&cnt=5";
     $.ajax({
       url: fiveDayQueryUrl,
       method: "GET"
     })

 //  dateValue = moment().tz(country + "/" + city).add(i, 'days').format('l');

 // lastly retreives the temperature in F and C

 minTempC = fiveDayForecast[i].temp.min;
 minTempF =  ((formula).toFixed(1);
 maxTempC = fiveDayForecast[i].temp.max;
 maxTempF =  (((formula)).toFixed(1);

// I will have to reset all of the variables at this point 

function resetGlobalVariables() {
  humidity = "";
  city = "";
  currentDate = "";
  minTempC = "";
  maxTempC = "";
  minTempF = "";
  maxTempF = "";
  windSpeed = "";
  humidity = "";
  currentWeather = "";
  country = "";
  latitude = "";
  longitude = "";
  uvIndex = "";
  tempF = "";
  tempC = "";
}