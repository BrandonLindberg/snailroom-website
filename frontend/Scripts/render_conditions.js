const conditionBox = document.querySelector('#conditionsTab')

document.addEventListener("weatherDataReady", (event) => {
    const data = event.detail;
    renderConditions(data);
});

function renderConditions(data) {
    const conditionBox = document.querySelector('#conditionsTab')

    conditionBox.innerHTML = `<div id="conditionDetails">
                        <h3>${data.current.weather[0].description}</h3>
                    </div>
                    <div id="tempDetails">
                        <h4>Temperature: ${Math.round(data.current.temp)}&#x2109</h4>
                        <h4>Feels Like: ${Math.round(data.current.feels_like)}&#x2109</h4>
                    </div>
                    <div id="humidityDetails">
                        <h4>Humidity: ${Math.round(data.current.humidity)}%</h4>
                        <h4>Dew Point: ${Math.round(data.current.dew_point)}&#x2109</h4>
                    </div>
                    <div id="windDetails">
                        <h4>Wind Speed: ${Math.round(data.current.wind_speed)} mph</h4>
                        <h4>Wind Direction: ${data.current.wind_deg}</h4>
                    </div>
                    <div id="precipDetails">
                        <h4>Precipitation</h4>
                    </div>`
}