// A $( document ).ready() block.
$(document).ready(function() {
    console.log("document ready!");

//Global Variables
let APIKey = "21152b77f6ec2e79fa6cbfafe69cae6b";
const citiesSearched = ['Houston', 'San Antonio'];

// Function to create the "Searched" cities and saving them in an active button list
function createCityBtns() {
    citiesSearched.forEach(function (city) {
        const cityBtn = $("<li>").addClass("list-group-item list-group-item-action").attr("data-type", city).text(city).attr("type", "button");
        $("#cities-viewed").append(cityBtn);
    });
}

createCityBtns();

// Input field to search for city
$('[name="add-city-button"]').on('click', function(event) {
    event.preventDefault();
    let cityName = $('[name="add-city"]').val();
    console.log('TEST EVENT LISTENER');
    citiesSearched.push(cityName);
    $('#cities-viewed').empty();
    createCityBtns();
    getCurrentWeather(cityName);
    $('#search-input').val("");
});

// Giving functionality to the "list buttons" 
$(document).on('click', 'li', function() {
    let newBtn = $(this).text();
    console.log(newBtn);
    getCurrentWeather(newBtn);
});

$('body').on('click', '.city', function () {
    console.log($(this).data('type'));
});


// AJAX function/call to the OpenWeatherMap API
function getCurrentWeather(searchTerm) {

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        console.log(queryURL);
        console.log(response);

        let lat = response.coord.lat;
        let lon = response.coord.lon;


        const unixTime = response.dt;
        const date = new Date(unixTime*1000);
        console.log(date.toLocaleDateString("en-US"));
        const iconInfo = response.weather[0].icon;
        console.log(iconInfo);
        const currentIcon = "http://openweathermap.org/img/wn/" + iconInfo +"@2x.png";

        // Passing the given response information to the correct location in the HTML code
        $("#currentCity").html("<h2>" + response.name + " (" + date + ") " + "<img src=" + currentIcon + "></h1>");
        $("#temp").text("Temperature: " + response.main.temp + " °F  " + "(Feels like: " + response.main.feels_like + " °F)");
        $("#humidity").text("Humidity: " + response.main.humidity + " %");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

        getUVIndex(lat, lon)
        get5Day(searchTerm)
    });
}

// AJAX function/call to get the UV Index from the OpenWeather API
function getUVIndex(lat, lon) {
    let UVURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
        url: UVURL,
        method: "GET"
    })

    .then(function(response){
        let currentUV = $("#UVIndex").text("UV Index: ");
        let UVBtn = $("<button>").addClass("btn btn-sm").attr("style", "margin-left: 5px").text(response.value);
        if (response.value < 3) {
            UVBtn.addClass("btn-success");
        } else if (response.value < 7) {
            UVBtn.addClass("btn-warning");
        } else {
            UVBtn.addClass("btn-danger");
        }
        currentUV.append(UVBtn);
    });
}

// AJAX function/call to get the 5-Day Forcast from the OpenWeather API
function get5Day(searchTerm) {
    let fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + APIKey;
    console.log("Below should be the 5-Day Info");
    
    $.ajax({
        url: fiveDay,
        method: "GET"
    })

    .then(function(response){
        console.log(response);

    });

}



});
