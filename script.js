const weatherApp = {};

weatherApp.geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
weatherApp.oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall';
weatherApp.key = 'bbfcaf59532e863784c25652f4481a55';


// Retreiving input from user
// weatherApp.getLocation = () => {
//     // retrieve the form element
//     const selEl = document.querySelector("select");
//     selEl.addEventListener('change', (e) => {
//     const inputValue = e.target.value;
//         console.log(inputValue)
//         weatherApp.getCoordinates(inputValue);
//     })
//     }


weatherApp.locationDefault = () => {
    // get the select element and make the default value toronto
    const defaultLocation = "Toronto, CA";
    weatherApp.getCoordinates(defaultLocation);
    // console.log(defaultLocation);
}

weatherApp.getLocation = () => {
    // retrieve the form element
    const formEl = document.querySelector("form");
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        selEl = document.querySelector("select");
        const inputValue = selEl.value;
        weatherApp.getCoordinates(inputValue);
    })
    }


// getting the coordinates with GEOCODING API
weatherApp.getCoordinates = (location) => {
    // parameters
    const geoApiUrl = new URL(weatherApp.geoURL)
    geoApiUrl.search = new URLSearchParams({
        q: location,
        appid: weatherApp.key
    })
    fetch(geoApiUrl)
    .then(function(results){
        return results.json()
    })
    .then(function(geoData){
        // console.log(geoData)
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        // console.log(`${lat}${lon}`)
        const oneCallURL = new URL(weatherApp.oneCallURL)
        oneCallURL.search = new URLSearchParams({
            lat: lat,
            lon: lon,
            units: "metric",
            appid: weatherApp.key
        })
        fetch(oneCallURL)
            .then(function(data){
                // console.log(weatherData)
                return data.json()
            })
            .then(function(weatherData){
                // console.log(weatherData);
                weatherApp.displayResults(weatherData, location);
            })
    })
}

weatherApp.displayResults = (weatherData, displayLocation) => {
    console.log(weatherData);
    // Putting data in variables
    const location = displayLocation;
    const date = weatherData.current.dt;
    const milliseconds = date * 1000 
    const dateObject = new Date(milliseconds);
    const localDateFormat = dateObject.toLocaleString();
    const temp = weatherData.current.temp;
    const high = weatherData.daily[0].temp.max;
    const low = weatherData.daily[0].temp.min;
    const icon = weatherData.current.weather[0].icon;
    let displayIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const desc = weatherData.current.weather[0].description;
    const sunrise = weatherData.daily[0].sunrise;
    const sunset = weatherData.daily[0].sunset;
    const wind = weatherData.current.wind_speed +" "+ weatherData.current.wind_gust+" "+ weatherData.current.wind_deg;
    const pop = weatherData.daily[0].pop;
    console.log(temp +" "+date+" "+location+" "+desc+" "+high+" "+low+" "+localDateFormat+" "+sunrise+" "+sunset+" "+wind+" "+pop);
    console.log(displayIcon);

    // Displaying data on page
    const city = document.querySelector(".city");
    city.textContent = location;
    const displayDate = document.querySelector(".date");
    displayDate.textContent = localDateFormat;
    const weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = displayIcon;
    weatherIcon.alt = "Icon displaying "+ desc;
    const displayDesc = document.querySelector(".weather-description");
    displayDesc.textContent = desc;
    const displayTemp = document.querySelector(".current-temperature");
    displayTemp.textContent = temp;
    const displayHigh = document.querySelector(".high-temperature");
    displayHigh.textContent = high;
    const displayLow = document.querySelector(".low-temperature");
    displayLow.textContent = low;
    const displaySunrise = document.querySelector(".sunrise");
    displaySunrise.textContent = sunrise;
    const displaySunset = document.querySelector(".sunset");
    displaySunset.textContent = sunset;
    const windData = document.querySelector(".wind");
    windData.textContent = wind;
    const precip = document.querySelector(".pop");
    precip.textContent = pop;
    

}

// Init
weatherApp.init = () => {
    weatherApp.getLocation();
    // Execute hard-coded location data on page load
    weatherApp.locationDefault();
}

weatherApp.init();