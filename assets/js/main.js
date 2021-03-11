console.log("Too much time on our hands");

//map stuff
//variables for map coordinates on page load
const lat = 42.38;
const long = -83.1;
const zoom = 10;

//variable for displaying map on web page
let userMap = L.map("cityMapId").setView([lat, long], zoom);

//attribution variable
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//varriables for map photo tiles
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, [attribution]);

//function adding tiles to map
tiles.addTo(userMap);

//openstreet api data retrieval function
function getApi(userCity) {
  console.log(userCity);
  let destinationEl = document.getElementById("destination");
  let finalDestination = destinationEl.value;
  console.log(finalDestination);

  fetch(titleUrl, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//weather stuff

const cityInput = document.querySelector("#cityInput");
const form = document.getElementById("search-form");
let cityName = localStorage.getItem("cityName");
let cities = [];

//listen for when submit button is clicked
form.addEventListener("submit", logSubmit);

//when button clicked or enter is pressed then do these things
function logSubmit(event) {
  event.preventDefault();
  let userCity = cityInput.value;
  localStorage.setItem("cityName", userCity);
  getApi(userCity);
}

if (cityName) {
  cityInput.value = cityName;
}

//function that retrieves data from third-party api for a specific location
function getApi(userCity) {
  console.log(userCity);
  const cityWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=b727c2bc7f7747620cc5cb2ff48d4ebe";
  fetch(cityWeatherUrl, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      const nameVal = data["name"];
      const tempVal = data["main"]["temp"];
      const humVal = data["main"]["humidity"];
      const windVal = data["wind"]["speed"];
      const uvVal = data["coord"]["lat"];
      const uviVal = data["coord"]["lon"];
      //update map view
      userMap.setView([uvVal, uviVal], zoom);
      //create html elements to display data onto browser
      document.getElementById("name").innerHTML = "Name: " + nameVal;
      console.log("nameVal");
      document.getElementById("temp").innerHTML = "Tempature: " + tempVal;
      document.getElementById("humidity").innerHTML = "Humidity: " + humVal;
      document.getElementById("wind-speed").innerHTML =
        "Wind Speed: " + windVal;
      document.getElementById("uv-index").innerHTML =
        "UV Index: " + uvVal + " " + uviVal;
      console.log(nameVal, tempVal, humVal, windVal, uvVal, uviVal);
      //create weather icons
      if (windVal > 5) {
        document.getElementById("main").className = "fas fa-wind";
        document.getElementById("main").innerHTML = "Feels windy";
      } else {
        document.getElementById("main").className = "fas fa-sun";
        document.getElementById("main").innerHTML = "Feels nice";
      }
    })
   
    .catch(function (error) {
      console.log(error);
    });
}


/////////////////////////////////////////////////////////////////////////////////

//trail stuff


// This is a check note to make sure it copied over
