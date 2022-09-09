var CityId = document.getElementById('cityname');
var button = document.getElementById('buttonid');
var rootUrl = 'http://api.openweathermap.org/geo/1.0/direct?q'
var recentsearch = document.getElementById('recent-search');
var CityNames = [];
var CityName;

button.onclick = function(event){
    event.preventDefault();
    CityName = CityId.value.trim()
    CityNames.push(CityName)
    localStorage.setItem('city', JSON.stringify(CityNames));
    var Cities =  JSON.parse(localStorage.getItem('city'));
    

    for (var i = 0; i < Cities.length; i++) {
        var recentsearchbutton = document.createElement('button');
        var valueselector = Cities[i];
        recentsearchbutton.append(valueselector);
        recentsearch.append(recentsearchbutton);
        console.log(Cities[i])
    
    }
    
    
    
}




