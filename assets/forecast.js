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
            date: new Date(weatherforecast.list[0].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[0].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[0].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[0].main.humidity + "%",
            icon: weatherforecast.list[0].weather[0].icon,
           
          },
        
          {forecastday: document.getElementById('day2'),
            date: new Date(weatherforecast.list[8].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[8].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[8].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[8].main.humidity + "%",
            icon: weatherforecast.list[8].weather[0].icon,
         
          },
        
          {forecastday: document.getElementById('day3'),
            date: new Date(weatherforecast.list[16].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[16].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[16].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[16].main.humidity + "%",
            icon: weatherforecast.list[16].weather[0].icon,
            
          },
          
          {forecastday: document.getElementById('day4'),
            date: new Date(weatherforecast.list[24].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[24].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[24].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[24].main.humidity + "%",
            icon: weatherforecast.list[24].weather[0].icon,
          },
        
          {forecastday: document.getElementById('day5'),
            date: new Date(weatherforecast.list[32].dt * 1000).toLocaleDateString("en-AU"),
            temp: Math.round(weatherforecast.list[32].main.temp - 273.15) + "\u00B0" + "C",
            wind: weatherforecast.list[32].wind.speed + " " + "m/s",
            humidity: weatherforecast.list[32].main.humidity + "%",
            icon: weatherforecast.list[32].weather[0].icon,
          },
        
          ]
          updateForecast(forecastdata[0].forecastday,forecastdata[0].date, forecastdata[0].temp, forecastdata[0].wind, forecastdata[0].humidity, forecastdata[0].icon )
          updateForecast(forecastdata[1].forecastday,forecastdata[1].date, forecastdata[1].temp, forecastdata[1].wind, forecastdata[1].humidity, forecastdata[1].icon )
          updateForecast(forecastdata[2].forecastday,forecastdata[2].date, forecastdata[2].temp, forecastdata[2].wind, forecastdata[2].humidity, forecastdata[2].icon )
          updateForecast(forecastdata[3].forecastday,forecastdata[3].date, forecastdata[3].temp, forecastdata[3].wind, forecastdata[3].humidity, forecastdata[3].icon )
          updateForecast(forecastdata[4].forecastday,forecastdata[4].date, forecastdata[4].temp, forecastdata[4].wind, forecastdata[4].humidity, forecastdata[4].icon )
         
          
})
};

var updateForecast =function (forecastday, date,temp,wind,humidity,icon){
    
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

  
