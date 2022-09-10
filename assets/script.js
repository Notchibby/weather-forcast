var CityId = document.getElementById('cityname');
var button = document.getElementById('buttonid');
var rootUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
var APIkey = '8e7e0a08d319c6fd75c3deaef8e9b47b'
var recentsearch = document.getElementById('recent-search');
var CityName;
var CityNames = [];



button.onclick = function(event){
    event.preventDefault();
    recentsearch.innerHTML = ''
    CityName = CityId.value.trim()
    CityNames.push(CityName)
    localStorage.setItem('city', JSON.stringify(CityNames));
    var Cities =  JSON.parse(localStorage.getItem('city'));
    

    for (var i = 0; i < Cities.length; i++) {
        var recentsearchbutton = document.createElement('button');
        var valueselector = Cities[i];
        recentsearchbutton.append(valueselector);
        recentsearchbutton.addEventListener('click', function(event){
            getlatandlon(event.target.innerHTML)
        })
        recentsearch.append(recentsearchbutton);
    }

    getlatandlon(CityName);
}

var getlatandlon = function(city){
    fetch(rootUrl + city + '&appid=' + APIkey)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat
        var lon = data[0].lon
        
        getweatherdata(lat,lon);
    
      })
    }
    


var getweatherdata = function(lat,lon){
    console.log(lat)
    console.log(lon)
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon +'&appid=' + APIkey)
    .then(function (response) {
        return response.json();
      })
      .then(function (weather) {
        console.log (weather)
       
      })

}
    