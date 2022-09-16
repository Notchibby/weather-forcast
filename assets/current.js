var CityId = document.getElementById("cityname");
var button = document.getElementById("buttonid");
var rootUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var APIkey = "8e7e0a08d319c6fd75c3deaef8e9b47b";
var recentsearch = document.getElementById("recent-search");
var CityName;
var CityNames = [];

button.onclick = function (event) {
  event.preventDefault();
  recentsearch.innerHTML = "";
  CityName = CityId.value.trim();
  if (CityName === "") {
    return;
  }
  CityName = CityName.toUpperCase();
  CityNames.push(CityName);
  localStorage.setItem("city", JSON.stringify(CityNames));
  var Cities = JSON.parse(localStorage.getItem("city"));
  Cities = Cities.reverse();

  for (var i = 0; i < Cities.length && i < 7; i++) {
    var recentsearchbutton = document.createElement("button");
    var valueselector = Cities[i];
    recentsearchbutton.append(valueselector);
    recentsearchbutton.addEventListener("click", function (event) {
      getlatandlon(event.target.innerHTML);
    });
    recentsearch.append(recentsearchbutton);
  }

  getlatandlon(CityName);
};

var getlatandlon = function (city) {
  fetch(rootUrl + city + "&appid=" + APIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getweatherdata(lat, lon);
      getweatherforecast(lat, lon);
      displayUVindex(lat, lon);
    });
};

var getweatherdata = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIkey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherobj) {
      var date = new Date(weatherobj.dt * 1000).toLocaleDateString("en-AU");
      var temp = Math.round(weatherobj.main.temp - 273.15) + "\u00B0" + "C";
      var wind = weatherobj.wind.speed + " " + "m/s";
      var humidity = weatherobj.main.humidity + "%";
      var icon = weatherobj.weather[0].icon;

      displaycurrentweatherdata(date, temp, wind, humidity, icon);
    
    });
};

var displayUVindex = function(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" +  APIkey)
  .then(function (response) {
    return response.json();
  })
  .then(function (UVdata) {
    var UVspan = document.createElement('span')
    UVspan.setAttribute('id', 'Uvindex')
    UVspan.textContent = UVdata.value
    var pUV = document.createElement("p");
    pUV.textContent = 'UV Index: '
    var UVapp = document.getElementById("weather-content").appendChild(pUV);
    UVapp.appendChild(UVspan) 
  });
}


var displaycurrentweatherdata = function (date, temp, wind, humidity, icon) {
  document.getElementById("weather-content").innerHTML = "";
  var pcontent = [
    "Temp:" + " " + temp,
    "Wind:" + " " + wind,
    "Humidity:" + " " + humidity,
  ];
  document.getElementById("header-h3").textContent =
    CityName + " " + "(" + date + ")";

  var existingIcon = document.getElementById("currentIcon");
  if (existingIcon) {
    existingIcon.remove();
  }

  var currentIcons = document.createElement("img");
  currentIcons.setAttribute("id", "currentIcon");
  currentIcons.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
  currentIcons.setAttribute("alt", "weatherforecast icons");
  document.getElementById("current-header").appendChild(currentIcons);

  for (var i = 0; i < pcontent.length; i++) {
    var pEl = document.createElement("p");
    var weatherp = document.getElementById("weather-content").appendChild(pEl);
    weatherp.textContent = pcontent[i];
  }
};
