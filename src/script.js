let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
let date = now.getDate();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.querySelector("#today");
currentDate.innerHTML = `Last Updated ${day}, ${date} ${month} ${hour}:${minute}`;

function showWeather(response) {
  console.log(response.data);
  let city = response.data.name;
  let country = response.data.sys.country;
  let tempC = Math.round(response.data.main.temp);
  let realF = Math.round(response.data.main.feels_like);
  let description = response.data.weather[0].description;
  let hTemp = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let sunRise = response.data.sys.sunrise;
  let lTemp = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let sunSet = response.data.sys.sunset;
  let weather_icon = response.data.weather[0].icon;

  let cityElement = document.querySelector("#citySearch");
  let temperatureElement = document.querySelector("#currentTemperature");
  let realFeelElement = document.querySelector("#realFeel");
  let descriptionElement = document.querySelector("#weatherDescription");
  let highTempElement = document.querySelector("#highTemp");
  let humidityElement = document.querySelector("#humidity");
  let sunriseElement = document.querySelector("#sunrise");
  let lowTempElement = document.querySelector("#lowTemp");
  let windElement = document.querySelector("#windSpeed");
  let sunsetElement = document.querySelector("#sunset");
  let weatherIcon = document.querySelector("#weatherIcon");

  cityElement.innerHTML = `${city}, ${country}`;
  temperatureElement.innerHTML = `${tempC}`;
  realFeelElement.innerHTML = `Real Feel ${realF}`;
  descriptionElement.innerHTML = `${description}`;
  highTempElement.innerHTML = `${hTemp}`;
  windElement.innerHTML = `${windSpeed}`;
  sunriseElement.innerHTML = `${sunRise}`;
  lowTempElement.innerHTML = `${lTemp}`;
  humidityElement.innerHTML = `${humidity}%`;
  sunsetElement.innerHTML = `${sunSet}`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather_icon}@2x.png`
  );
}

function showNewCityWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let searchFromInput = searchInput.value;
  let apiKey = "3bf3d898af236340eac60ab5658c130c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchFromInput}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showNewCityWeather);

//Challenge 2
function showLocationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
  function showCurrentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "3bf3d898af236340eac60ab5658c130c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }
}
let currentLocationButton = document.querySelector(".locationButton");
currentLocationButton.addEventListener("click", showLocationTemperature);
