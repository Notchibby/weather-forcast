// creating variables to help navigate the DOM
var CityId = document.getElementById("cityname");
var button = document.getElementById("buttonid");
var rootUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var APIkey = "8e7e0a08d319c6fd75c3deaef8e9b47b";
var recentsearch = document.getElementById("recent-search");
var CityName;
var CityNames = [];

// added an event listener to the search button that allows for the storage and retrival of the input from the local storage
button.onclick = function (event) {
  event.preventDefault();
  recentsearch.innerHTML = "";
  CityName = CityId.value.trim();
// if no city name input do not continue to run the function
  if (CityName === "") {
    return;
  }
  CityName = CityName.toUpperCase();
  CityNames.push(CityName);
  // stores city name in local storage
  localStorage.setItem("city", JSON.stringify(CityNames));
  // gets city name form local storage
  var Cities = JSON.parse(localStorage.getItem("city"));

  // Allows for the most recent input to be displayed on the top of the recent searches
  Cities = Cities.reverse();

// Creates a button and adds an evenetlistener to each of the value retrieved from the local storage and appends it to the html page
  for (var i = 0; i < Cities.length && i < 7; i++) {
    var recentsearchbutton = document.createElement("button");
    var valueselector = Cities[i];
    recentsearchbutton.append(valueselector);
    recentsearchbutton.addEventListener("click", function (event) {
      getlatandlon(event.target.textContent);
    });
    recentsearch.append(recentsearchbutton);
  }

  getlatandlon(CityName);
};

// creates a function that retrieves the values of the longitude and latitude for a given city
var getlatandlon = function (city) {
  fetch(rootUrl + city + "&appid=" + APIkey)
    .then(function (response) {
      return response.json()
    
      
    })
    .then(function (data) {
      // stores the value of the latitude and longitude as variables
      var lat = data[0].lat;
      var lon = data[0].lon;
    
      getweatherdata(lat, lon);
      getweatherforecast(lat, lon);
      displayUVindex(lat, lon);
    })

    // creates an alert if city does not exist
    .catch((error)=>{
      alert('City not Found')
    })
};

// creates a function that retrieves the weather data of a city given its latitude and longitude
var getweatherdata = function (lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=metric&appid=" +
      APIkey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherobj) {
      // stores the data retrieved from the API call as variables
      var name = weatherobj.name
      var date = new Date(weatherobj.dt * 1000).toLocaleDateString("en-AU");
      var temp = weatherobj.main.temp + "\u00B0" + "C";
      var wind = weatherobj.wind.speed + " " + "m/s";
      var humidity = weatherobj.main.humidity + "%";
      var icon = weatherobj.weather[0].icon;

      displaycurrentweatherdata(name, date, temp, wind, humidity, icon);
    
    });
};

// creates a function that retrieves the UV index data from an API call and displays the data on the html page
var displayUVindex = function(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" +  APIkey)
  .then(function (response) {
    return response.json();
  })
  .then(function (UVdata) {
    var UVspan = document.createElement('span')

    // the uv index changes color based on if the value is favourable, moderate or extreme
    if (UVdata.value < 5){
      UVspan.setAttribute('id', 'Uvindexfavourable')
    }
    else if (UVdata.value >= 5 && UVdata.value <= 7){
      UVspan.setAttribute('id', 'Uvindexmoderate')
    }
    else {
      UVspan.setAttribute('id', 'Uvindexextreme')
    }

    UVspan.textContent = UVdata.value
    var pUV = document.createElement("p");
    pUV.textContent = 'UV Index: '
    var UVapp = document.getElementById("weather-content").appendChild(pUV);
    UVapp.appendChild(UVspan) 
  });
}

// displays the retrieved weather data on the html page
var displaycurrentweatherdata = function (name, date, temp, wind, humidity, icon) {
  document.getElementById("weather-content").innerHTML = "";
  var pcontent = [
    "Temp:" + " " + temp,
    "Wind:" + " " + wind,
    "Humidity:" + " " + humidity,
  ];

  document.getElementById("header-h3").textContent =
    name.toUpperCase() + " " + "(" + date + ")";

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

// allows for a button click when the enter key is pressed
CityId.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

