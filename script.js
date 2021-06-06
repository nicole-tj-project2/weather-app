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

weatherApp.getLocation = () => {
    // retrieve the form element
    const formEl = document.querySelector("form");
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        selEl = document.querySelector("select");
        const inputValue = selEl.value;
        weatherApp.getCoordinates(inputValue);
        // formEl.removeEventListener();
        window.location.href = './weather.html';
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
        console.log(geoData)
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        console.log(`${lat}${lon}`)
        const oneCallURL = new URL(weatherApp.oneCallURL)
        oneCallURL.search = new URLSearchParams({
            lat: lat,
            lon: lon,
            appid: weatherApp.key
        })
        fetch(oneCallURL)
            .then(function(data){
                // console.log(weatherData)
                return data.json()
            })
            .then(function(weatherData){
                console.log(weatherData);
            })
    })
}



// Init
weatherApp.init = () => {
    weatherApp.getLocation();
}

weatherApp.init();