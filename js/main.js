const API_KEY = '6a3d917beae1775bfa8c8ec5387f597f'
const api_root_url = 'http://api.openweathermap.org/data/2.5/weather?zip='
const city = document.querySelector('.city');
const zip = document.querySelector('.zip');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const weather = document.querySelector('.weather');
const tempUnit = document.querySelector('.temp-unit');
const icon = document.querySelector('.icon');
const background = document.querySelector('.main-container')
const groups = {
  icon: {

  'Thunderstorm': 'img/thunderstorm.png',

  'Drizzle': 'img/rain.png',

  'Rain': 'img/rain.png',

  'Snow': 'img/snow.png',

  'Clear': 'img/sun.png',

  'Clouds': 'img/cloudy.png'
  },
  image:{
    'Thunderstorm': new Image().src = 'img/images/thunderstorm.jpg',

    'Drizzle': new Image().src = 'img/images/rain.jpg',
  
    'Rain': new Image().src ='img/images/rain.jpg',
  
    'Snow': new Image().src ='img/images/snow.jpg',
  
    'Clear': new Image().src ='img/images/clear.jpg',
  
    'Clouds': new Image().src ='img/images/cloudy.jpg',
  }

}

function KtoC(Kelvin) {
  return Math.round(Kelvin - 273)

}

function KtoF(Kelvin) {
  return Math.round(1.8 * (Kelvin - 273) + 32)

}

function CtoF(Celcius) {
  return Math.round(Celcius * 9 / 5 + 32)

}

function FtoC(Fahrenheir) {
  return Math.round((Fahrenheir - 32) * 5 / 9)
}


function getWeather(zipCode) {
  $.ajax({ url: api_root_url + zipCode + ',us&appid=' + API_KEY,
    success: function(response) {

      console.log(response);
      weather.textContent = response.weather[0].description
      city.textContent = '"'+response.name+'"'
      temp.textContent = KtoF(response.main.temp)
      tempUnit.textContent = '°F'
      humidity.textContent = response.main.humidity + "%"
      icon.setAttribute('src',groups.icon[response.weather[0].main])
      background.style.backgroundImage = `url('${groups.image[response.weather[0].main]}')`;
      zip.select()

    },
    error: function(err){
      console.log(err)
      alert(`Error: ${err.statusText}`)
    }

  })

}
zip.value=33134
getWeather(33134);
zip.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    // console.log(event.target.value);
    getWeather(event.target.value)

  }
  // console.log(event.keyCode)
})
tempUnit.addEventListener('click', function() {
  if (tempUnit.textContent === '°C') {
    temp.textContent = CtoF(temp.textContent)
    tempUnit.textContent = '°F'
  } else {
    temp.textContent = FtoC(temp.textContent)
    tempUnit.textContent = '°C'
  }



})
