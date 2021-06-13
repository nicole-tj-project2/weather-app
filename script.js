const weatherApp = {};

weatherApp.geoURL = 'https://api.openweathermap.org/geo/1.0/direct';
weatherApp.oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall';
weatherApp.key = 'bbfcaf59532e863784c25652f4481a55';

weatherApp.locationDefault = () => {
    const selEl = document.querySelector("select");
    selEl.options[0].selected = 'selected';
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
                weatherApp.dynamicBG(weatherData);
                // console.log(weatherApp.dynamicBG(weatherData, bg))
            })
    })
}

// Time and date conversion method
weatherApp.convertTime = (unixTime,tz,type) => {
    
    const milliseconds = (unixTime) * 1000; 
    const dateObject = new Date(milliseconds);
    // Format date according to timezone. Type 1 returns only date and type 2 returns only time
    if(type === 1) {
        const options = { timeZone:tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        localDateFormat = dateObject.toLocaleDateString([], options);
        return localDateFormat;
    } else if(type === 2) {
        const options = { timeZone: tz, timeStyle:"short" };
        const timeOnly = dateObject.toLocaleTimeString('en-US', options);
        return timeOnly;
    }
    
}

weatherApp.formatTemp = (temp) => {
    let formattedTemp = Math.floor(temp);
    formattedTemp = formattedTemp + '\u2103';
    return formattedTemp;
}

weatherApp.convertSpeed = (speed) => {
    // Convert from m/s to km/h
    // Wind gust can sometimes be non existent hence check and return nil
    if(speed) {
        let newSpeed = speed * 3.6;
        newSpeed = Math.floor(newSpeed) +  ` km/h`;
        return newSpeed;
    } else return "Nil"
    
}


weatherApp.displayResults = (weatherData, displayLocation) => {
    // console.log(weatherData);
    // const {current, daily} = weatherData <-decunstructing
    // Putting data in variables
    const location = displayLocation;
    const date = weatherData.current.dt;
    const timeZone = weatherData.timezone;
    const temp = weatherData.current.temp;
    const feels = weatherData.current.feels_like;
    const high = weatherData.daily[0].temp.max;
    const low = weatherData.daily[0].temp.min;
    const icon = weatherData.current.weather[0].icon;
    let displayIcon = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    const desc = weatherData.current.weather[0].description;
    const sunrise = weatherData.daily[0].sunrise;
    const sunset = weatherData.daily[0].sunset;
    const windSpeed = weatherData.current.wind_speed 
    // ^^^
    const windGust = weatherData.current.wind_gust;
    let pop = weatherData.daily[0].pop;
    pop = Math.floor((pop * 100)) + "%";
    // console.log(temp +" "+date+" "+location+" "+desc+" "+high+" "+low+" "+formattedDate+" "+sunrise+" "+sunset+" "+pop);
    // console.log(displayIcon);

    // Displaying data on page
    const city = document.querySelector(".city");
    city.textContent = `Current weather in ${location}`;
    const displayDate = document.querySelector(".date");
    displayDate.textContent = weatherApp.convertTime(date,timeZone,1);
    const weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = displayIcon;
    weatherIcon.alt = "Icon displaying "+ desc;
    const displayDesc = document.querySelector(".weather-description");
    displayDesc.textContent = desc;
    const displayTemp = document.querySelector(".current-temperature");
    displayTemp.textContent = weatherApp.formatTemp(temp);
    const displayFeels = document.querySelector(".feels-like");
    displayFeels.innerHTML = `Feels Like ${weatherApp.formatTemp(feels)}`;
    const displayHigh = document.querySelector(".high-temperature");
    displayHigh.innerHTML = `High ${weatherApp.formatTemp(high)}`;
    const displayLow = document.querySelector(".low-temperature");
    displayLow.innerHTML = `Low ${weatherApp.formatTemp(low)}`;
    const displaySunrise = document.querySelector(".sunrise");
    displaySunrise.innerHTML = `Sunrise ${weatherApp.convertTime(sunrise,timeZone,2)}`;
    const displaySunset = document.querySelector(".sunset");
    displaySunset.innerHTML = `Sunset ${weatherApp.convertTime(sunset,timeZone,2)}`;
    const displaySpeed = document.querySelector(".wind-speed");
    displaySpeed.innerHTML = `Wind Speed ${weatherApp.convertSpeed(windSpeed)}`;
    const displayGust = document.querySelector(".wind-gust");
    displayGust.innerHTML = `Wind Gust ${weatherApp.convertSpeed(windGust)}`;
    const precip = document.querySelector(".pop");
    precip.innerHTML = `POP ${pop}`;
    

}

// Dynamic background 

const body = document.querySelector('body');
let gradient = `linear-gradient(180deg, rgba(0,41,66,0.3) 13%, rgba(0,77,119,0.7) 100%)`;

weatherApp.dynamicBG = (weatherData) => {

    const weatherType = weatherData.current.weather[0].description;

    console.log(weatherType);
    for (let value in weatherType) {

        if (weatherType.includes('thunderstorm')) {
            body.style.background = `${gradient}, url('assets/thunderstorm.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType.includes('drizzle')) {
            body.style.background = `${gradient}, url('assets/drizzle.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType.includes('rain')) {
            body.style.background = `${gradient}, url('assets/rain.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType.includes('snow')) {
            body.style.background = `${gradient}, url('assets/snow.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType.includes('clear')) {
            body.style.background = `${gradient}, url('assets/clear.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType === "overcast clouds" || weatherType === "broken clouds") {
            body.style.background = `${gradient}, url('assets/clouds.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else if (weatherType.includes('clouds')) {
            body.style.background = `${gradient}, url('assets/partial-clouds.jpg') no-repeat`;
            body.style.backgroundSize = 'cover';
        } else {
            body.style.background = 'linear-gradient(180deg, rgba(0,41,66,1) 13%, rgba(0,77,119,0.9457983877144608) 100%)';
        }
            return value;
    }
}

// Init
weatherApp.init = () => {
    weatherApp.getLocation();
    // Execute hard-coded location data on page load
    weatherApp.locationDefault();
}

weatherApp.init();