document.addEventListener("weatherDataReady", (event) => {
    const data = event.detail;
    renderForecastGraph(data)
});

function renderForecastGraph(data) {
    const hourlyTempArray = data.hourly.slice(0, 12)
    const dailyTemps = data.daily.slice(0, 6);

    const hours = Array.from({length: 12}, (_, index) => index + 1);
    const hourlyTemps = hourlyTempArray.map(temps => temps.temp);

    const days = ['today', 'tomorrow', 'next', 'next', 'next', 'next'];
    const dailyTempMax = dailyTemps.map(dailyTemp => dailyTemp.temp.max);
    
    const dailyTempMin = dailyTemps.map(dailyTemps => dailyTemps.temp.min);

    // 12 hour forecast chart
    new Chart(
        document.getElementById('forecastHourlyGraph'),
        {
            type: 'line',
            data: {
                labels: hours,
                datasets: [{
                    data: hourlyTemps,
                    fill: false,
                    borderColor: 'rgb(255, 136, 0)',
                    tension: .5
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    )

    // 5 day forecast chart
    new Chart(
        document.getElementById('forecastDailyGraph'),
        {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Max',
                    data: dailyTempMax,
                    fill: false,
                    borderColor: 'rgb(255, 136, 0)',
                    tension: .2
                },
                {
                    label: 'Min',
                    data: dailyTempMin,
                    fill: false,
                    borderColor: 'rgb(0, 93, 255)',
                    tension: .2
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 15,
                            boxHeight: 1
                        }
                    }
                }
            }
        }
    )
}