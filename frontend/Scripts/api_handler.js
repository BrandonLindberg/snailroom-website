const apiKey = '';

const separators = /[,\s]+/;

const conditionsHeader = document.getElementById('conditionsHeader');

let cityName = '';
let stateName = '';
let countryName = '';
let queryString = '';

// Take the location input and convert it into separate objects
window.onload = function convertInputToObjects () {
    const locationQuery = new URLSearchParams(window.location.search).get('locationQuery');
    const inputValue = locationQuery.valueOf().toUpperCase();

    const locationCode = inputValue.split(separators);

    cityName = locationCode[0];
    stateName = locationCode[1];
    countryName = locationCode[2];

    convertObjectsToString();
}

// Convert the objects into an array, filtering out any null or undefined values, and convert it to one string properly formatted for the geocode API call
function convertObjectsToString() {
    const objects = [cityName, stateName, countryName].filter(Boolean);
    let queryString = objects.join(',');

    convertLocationToCords(queryString);

    console.log(queryString);
}

// Convert the location into coordinates
async function convertLocationToCords(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;
    const geoResult = await fetch(url);

    if (!geoResult.ok) {
        console.log(`HTTP ${geoResult.status}: ${geoResult.statusText}`);
    }
    const geoData = await geoResult.json();

    if (!Array.isArray(geoData) || geoData.length === 0) {
        ('No location found');
    }
    const {lat, lon, name, country, state} = geoData[0];

    conditionsHeader.innerText = `Current conditions for ${name}, ${state}, ${country}`;

    getConditionsFromCoords(lat, lon);
}

// Get current weather conditions for location from coordinates
async function getConditionsFromCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${apiKey}`;
    const resultData = await fetch(url);

    if (!resultData.ok) {
        console.log(`HTTP ${resultData.status}: ${resultData.statusText}`);
    }
    resultFinal = await resultData.json();

    window.weatherData = resultFinal;

    document.dispatchEvent(new CustomEvent('weatherDataReady', {detail: resultFinal}));
}