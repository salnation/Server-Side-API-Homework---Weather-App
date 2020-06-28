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