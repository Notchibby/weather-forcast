var getweatherforecast = function(lat,lon){
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          APIkey
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (weatherforecast) {

          var forecastdata = [
          {forecastday: document.getElementById('day1'),
            date: new Date(weatherforecast.list[8].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[8].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[8].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[8].main.humidity + "%",
            icon: weatherforecast.list[8].weather[0].icon,
           
          },
        
          {forecastday: document.getElementById('day2'),
            date: new Date(weatherforecast.list[16].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[16].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[16].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[16].main.humidity + "%",
            icon: weatherforecast.list[16].weather[0].icon,
         
          },
        
          {forecastday: document.getElementById('day3'),
            date: new Date(weatherforecast.list[24].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[24].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[24].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[24].main.humidity + "%",
            icon: weatherforecast.list[24].weather[0].icon,
            
          },
          
          {forecastday: document.getElementById('day4'),
            date: new Date(weatherforecast.list[32].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[32].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[32].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[32].main.humidity + "%",
            icon: weatherforecast.list[32].weather[0].icon,
          },
        
          {forecastday: document.getElementById('day5'),
            date: new Date(weatherforecast.list[39].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[39].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[39].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[39].main.humidity + "%",
            icon: weatherforecast.list[39].weather[0].icon,
          },
        
          ]

          for (var i = 0; i < forecastdata.length; i++){
            updateForecast(forecastdata[i].forecastday, forecastdata[i].date, forecastdata[i].temp, forecastdata[i].wind, forecastdata[i].humidity, forecastdata[i].icon)
          }
          
})
};

var updateForecast =function (forecastday, date,temp,wind,humidity,icon){
    forecastday.innerHTML = '';
    var paracontent = [
        '(' + date + ')',
        "Temp:" + " " + temp,
        "Wind:" + " " + wind,
        "Humidity:" + " " + humidity,
      ];
      var icons = document.createElement('img')
      icons.setAttribute('id', 'icons')
      icons.setAttribute('src','https://openweathermap.org/img/w/' + icon + '.png')
      icons.setAttribute('alt', 'weatherforecast icons')

      forecastday.appendChild(icons)
      for (var i = 0; i < paracontent.length; i++) {
        var p2El = document.createElement("p");
        p2El.style.color = 'white';
        p2El.textContent = paracontent[i];
        forecastday.appendChild(p2El)
        
      }
}

  
