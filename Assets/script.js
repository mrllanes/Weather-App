// A $( document ).ready() block.
$(document).ready(function() {
    console.log("document ready!");

//Global Variables
let APIKey = "21152b77f6ec2e79fa6cbfafe69cae6b";
const citiesSearched = ['Houston', 'New York', 'Los Angeles'];

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
        // console.log(queryURL);
        // console.log(response);
        let lat = response.coord.lat;
        let lon = response.coord.lon;

        const unixTime = response.dt;
        const date = new Date(unixTime*1000);
        console.log(date.toLocaleDateString("en-US"));
        const iconInfo = response.weather[0].icon;
        console.log(iconInfo);
        const currentIcon = "http://openweathermap.org/img/wn/" + iconInfo +"@2x.png";

        // Passing the given response information to the correct location in the HTML code
        $("#currentCity").html("<h2>" + response.name + " (" + date.toLocaleDateString() + ") " + "<img src=" + currentIcon + "></h1>");
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
    let fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + APIKey + "&units=imperial";
    console.log("Below should be the 5-Day Info");
    
    $.ajax({
        url: fiveDay,
        method: "GET"
    })

    .then(function(response){
        // console.log(response);

        // Function to retrieve response info and pass it to the appropriate HTML location
        for (let index = 0; index < response.list.length; index++) {
            // const fiveDayInfo = response.list[index];
            // console.log(fiveDayInfo);
            const unixTime = response.list[index].dt;
            const date = new Date(unixTime*1000);
            const iconInfo = response.list[index].weather[0].icon;
            const currentIcon = "http://openweathermap.org/img/wn/" + iconInfo +".png";
            const tempMax = response.list[index].main.temp_max;
            const tempLow = response.list[index].main.temp_min;
            const humid5Day = response.list[index].main.humidity;
            if (index === 0) {
                $("#0-date").html('<h5>' + date.toLocaleDateString() + '</h5>');
                $('#0-icon').html('<img src=' + currentIcon + '>');
                $('#0-tempHigh').html('<p>High: ' + tempMax + ' °F</p>');
                $('#0-tempLow').html('<p>Low: ' + tempLow + ' °F</p>');
                $('#0-humid').html('<p>Humidity: ' + humid5Day + ' %</p>');
            } else if (index === 8) {
                $("#8-date").html('<h5>' + date.toLocaleDateString() + '</h5>');
                $('#8-icon').html('<img src=' + currentIcon + '>');
                $('#8-tempHigh').html('<p>High: ' + tempMax + ' °F</p>');
                $('#8-tempLow').html('<p>Low: ' + tempLow + ' °F</p>');
                $('#8-humid').html('<p>Humidity: ' + humid5Day + ' %</p>');
            } else if (index === 16) {
                $("#16-date").html('<h5>' + date.toLocaleDateString() + '</h5>');
                $('#16-icon').html('<img src=' + currentIcon + '>');
                $('#16-tempHigh').html('<p>High: ' + tempMax + ' °F</p>');
                $('#16-tempLow').html('<p>Low: ' + tempLow + ' °F</p>');
                $('#16-humid').html('<p>Humidity: ' + humid5Day + ' %</p>');
            } else if (index === 24) {
                $("#24-date").html('<h5>' + date.toLocaleDateString() + '</h5>');
                $('#24-icon').html('<img src=' + currentIcon + '>');
                $('#24-tempHigh').html('<p>High: ' + tempMax + ' °F</p>');
                $('#24-tempLow').html('<p>Low: ' + tempLow + ' °F</p>');
                $('#24-humid').html('<p>Humidity: ' + humid5Day + ' %</p>');
            } else if (index === 32) {
                $("#32-date").html('<h5>' + date.toLocaleDateString() + '</h5>');
                $('#32-icon').html('<img src=' + currentIcon + '>');
                $('#32-tempHigh').html('<p>High: ' + tempMax + ' °F</p>');
                $('#32-tempLow').html('<p>Low: ' + tempLow + ' °F</p>');
                $('#32-humid').html('<p>Humidity: ' + humid5Day + ' %</p>');
            }
        }
    });
}

});
