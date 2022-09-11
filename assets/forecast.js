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
          console.log(weatherforecast);
})
};