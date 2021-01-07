// A $( document ).ready() block.
$(document).ready(function() {
    console.log("document ready!");

var APIKey = "21152b77f6ec2e79fa6cbfafe69cae6b";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=" + APIKey + "&units=imperial";





const citiesSearched = ['Houston', 'San Antonio'];

function createCityBtns() {
    citiesSearched.forEach(function (city) {
        const cityBtn = $("<button>").attr("data-type", city).text(city).attr("type", "button").addClass("city");
        $(".cities-viewed").append(cityBtn);
    });
}

createCityBtns();

$('[name="add-city-button"]').on("click", function() {
    console.log("TEST EVENT LISTENER");
    citiesSearched.push($('[name="add-city"]').val());
    $(".cities-viewed").empty();
    createCityBtns();

});

$('body').on('click', '.city', function () {
    console.log($(this).data('type'));
});


// AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response){
    console.log(queryURL);
    console.log(response);

    const unixTime = response.dt;
    const date = new Date(unixTime*1000);
    console.log(date.toLocaleDateString("en-US"));

    $("#currentCity").html("<h2>" + response.name + " (" + date + ") </h1>");
    $("#temp").text("Temperature: " + response.main.temp + "(Feels like: " + response.main.feels_like +")");
    $("#humidity").text("Humidity: " + response.main.humidity + " %");
    $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
});

    // api.openweathermap.org/data/2.5/weather?q={city}&appid={21152b77f6ec2e79fa6cbfafe69cae6b}&units=imperial
    // api.openweathermap.org/data/2.5/find?q=London&appid={21152b77f6ec2e79fa6cbfafe69cae6b}
    // api.openweathermap.org/data/2.5/find?q=London&units=imperial



});
