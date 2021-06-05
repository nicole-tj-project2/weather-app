
// fetch('http://api.weatherstack.com/current?access_key=f1a05eb255c245dce0247a76569643ad&query=Toronto')
// .then(function(response){
//      return response.json();
//     })
//  .then(function(weatherData){
//    console.log(weatherData);
//  })
    
    
    // User selects location from predetermined options in a dropdown
    // when seleted, submit
    // bbfcaf59532e863784c25652f4481a55


    // Based on what is selected, output data


//     fetch('http://api.weatherstack.com/current?access_key=f1a05eb255c245dce0247a76569643ad&query=Toronto')
// .then(function(response){
//      return response.json();
//     })
//  .then(function(weatherData){
//    console.log(weatherData);
//  })

// const url = new URL('http://api.weatherstack.com/current');

// url.search = new URLSearchParams({
//   access_key: 'f1a05eb255c245dce0247a76569643ad',
//   query: 'Toronto'
// });

// fetch(url)
// .then(function(response){
//   return response.json();
//  })
// .then(function(weatherData){
// console.log(weatherData);
// })

// bbfcaf59532e863784c25652f4481a55
// fetch('https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=bbfcaf59532e863784c25652f4481a55')
// .then(function(response){
//   return response.json();
// })
// .then(function(weatherData){
//   console.log(weatherData);
// })


// tcAKLyC3UWNqsRBFm1EqKLYvDJTCxajG 
// fetch('http://dataservice.accuweather.com/currentconditions/v1/toronto"details=true"')
// .then(function(response){
//   return response.json();
// })
// .then(function(weatherData){
//   console.log(weatherData);
// })

const weatherApp = {};

weatherApp.geoURL = 'http://api.openweathermap.org/geo/1.0/direct';
weatherApp.oneCallURL = 'https://api.openweathermap.org/data/2.5/onecall';
weatherApp.key = 'bbfcaf59532e863784c25652f4481a55';

// getting the coordinates with GEOCODING API
weatherApp.getCoordinates = () => {
    // parameters
    const geoApiUrl = new URL(weatherApp.geoURL)
    geoApiUrl.search = new URLSearchParams({
        q: 'Toronto',
        appid: weatherApp.key
    })
    fetch(geoApiUrl)
    .then(function(results){
        return results.json()
    })
    .then(function(geoData){
        const lat = geoData[0].lat;
        console.log(lat);
    })
}



// Init
weatherApp.init = () => {
    weatherApp.getCoordinates()
}

weatherApp.init();