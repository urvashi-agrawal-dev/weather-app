
const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '1bb92d5e18a6b6aa3fd03ea6c9e8cdae';

$(document).ready(function () {

    // Default city
    weatherFn("Noida");

    // Button click event
    $("#city-input-btn").on("click", function () {
        let city = $("#city-input").val();
        if (city) {
            weatherFn(city);
        } else {
            alert("Please enter a city name");
        }
    });
});

async function weatherFn(cityName) {
    const fullURL = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(fullURL);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.log("Error fetching weather:", error);
    }
}

function weatherShowFn(data) {
    $("#city-name").text(data.name);
    $("#date").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    $("#temperature").text(`${Math.round(data.main.temp)}°C`);
    $("#description").text(data.weather[0].description);
    $("#wind-speed").text(`Wind Speed: ${data.wind.speed} m/s`);

    let icon = data.weather[0].icon;
    $("#weather-icon").attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

    $("#weather-info").fadeIn();
}
