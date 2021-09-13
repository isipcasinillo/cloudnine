const submitBtnEl = document.getElementById('current-submit')
const curDay = document.getElementsByClassName('curDay')
const curTemp = document.getElementsByClassName('curTemp');
const curUvi = document.getElementsByClassName('curUvi');
const curHumid = document.getElementsByClassName('curHumid');
const currentDate = document.getElementById('currentDate');
const mainTemp = document.getElementById('current-temp');
const mainHumid = document.getElementById('current-humid');
const mainUvi = document.getElementById('current-uvi');
const curCity = document.getElementById('current-city-name')
var searchedCities = []
function getWeather(city) {
    
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
      '&units=imperial&appid=822885dbd372247ac84e0b86f3009f81'
  )
    .then((response) => response.json())
    .then((data) => {
      // fetch lon and lat used for onecall fetch

      var lon = data.coord.lon;
      var lat = data.coord.lat;
      console.log(lon, lat)
      fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          lat +
          '&lon=' +
          lon +
          '&units=imperial&exclude=minutely,hourly,alerts,minutely&appid=822885dbd372247ac84e0b86f3009f81'
      )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          getForecast(data);
        });
    });
}

submitBtnEl.addEventListener('click', function () {
    var city = document.getElementById('current-searchbar').value;
    // curCity.textContent = city
    var splitCity = city.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    var currentCity = document.getElementById('current-city-name');
    currentCity.textContent = splitCity;
    getWeather(splitCity)
    storecity(splitCity)
});

function getForecast(data) {
    
    for (var i = 0; i < 6; i++) {
    var day = moment().add(i, 'days').format('dddd').toUpperCase();
    var date = moment().format('MMMM D');
   
    mainTemp.textContent = data.daily[0].temp.day + '°F';
    curTemp[i].textContent = data.daily[i+1].temp.day + '°F';
    curUvi[i].textContent = data.daily[i+1].uvi;
    curHumid[i].textContent = data.daily[i+1].humidity + ' %';
    curDay[i].textContent = day;
    currentDate.textContent = date;
  }
}
function storecity(cityx) {
    searchedCities.push(cityx)
    localStorage.setItem('city', JSON.stringify(searchedCities))
//   localStorage.setItem('city', cityx) || []
  
//   console.log(x)
}
function showcity() {
    
}

// showcity();



// getWeather('manila')


