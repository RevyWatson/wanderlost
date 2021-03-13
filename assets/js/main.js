//map information
//variables for map coordinates
const lat = 42.3314;
const long = -83.0458;
const zoom = 10;

//variable for map display on web page
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

//
function getTrails() {
  console.log();
  //Trail Data
  const trailData =
    "https://services3.arcgis.com/Jdnp1TjADvSDxMAX/ArcGIS/rest/services/open_Trails/FeatureServer/1/query?where=1%3D1&outFields=State_Designated_Trail,Status,Hiking,Hiking_Name,Trail_Network,Miles,Shape__Length&geometry=-119.054%2C38.557%2C-55.773%2C49.561&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json";

  fetch(trailData, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      console.log(trailData);

      //For Loop for getting lat/lon, and adding markers from "trailData"
      for (let i = 0, l = data.features.length; i < l; i++){

      //Calling all the Lat's and Lon's from array
      let lon = data["features"][i]["geometry"]["paths"][0][0][0];
      let lat = data["features"][i]["geometry"]["paths"][0][0][1];

      //Calling all Hiking Name's from array
      let name = data["features"][i]["attributes"]["Hiking_Name"];

      //Grouping Lat and Lon variables
      let markerLoc = [lat,lon];
      //Adding markers to all the Lat's and Lon's (aka: the Location)
      let marker = new L.Marker(markerLoc)

      //Adding a click pop up to the markers
      //Displays name
      marker.bindPopup(name);

      //Adding "marker" to Leaflet Map
      userMap.addLayer(marker);

      //For displaying on page
      let miles = data["features"][i]["attributes"]["Miles"];
      let status = data["features"][i]["attributes"]["Status"];
      let network = data["features"][i]["attributes"]["Trail_Network"];
      
      //Add Click Listner for clicked markers
      marker.addEventListener("click", function(){
        
      document.getElementById("trailName").innerHTML = name;
      document.getElementById("miles").innerHTML = "Miles: " + miles;
      document.getElementById("status").innerHTML = "Status: " + status;
      document.getElementById("network").innerHTML =
        "Trail Network: " + network;
      });
    
      }
    })
    .catch(function (error) {
      console.log(error);
      
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////

//Weather information

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
  getTrails();
}

if (cityName) {
  cityInput.value = cityName;
}

function getuvIndex(lat, lon) {
  let requestUrl2 =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=b727c2bc7f7747620cc5cb2ff48d4ebe";
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("this is the uv index fetch", data.value);
      document.getElementById("uv-index").innerHTML = "UV Index: " + data.value;
    });
}

//Function for retrieving data from third-party api for specific location
function getApi(userCity) {
  console.log(userCity);
  const cityWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&units=imperial&appid=b727c2bc7f7747620cc5cb2ff48d4ebe";
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
      const newLat = data["coord"]["lat"];
      const newLong = data["coord"]["lon"];
      const uvVal = data["coord"]["lat"];
      const uviVal = data["coord"]["lon"];

      userMap.setView([newLat, newLong], zoom);

      document.getElementById("name").innerHTML = "Name: " + nameVal;
      //console.log("nameVal");
      document.getElementById("temp").innerHTML =
        "Tempature: " + tempVal + "°F";
      document.getElementById("humidity").innerHTML =
        "Humidity: " + humVal + "%";
      document.getElementById("wind-speed").innerHTML =
        "Wind Speed: " + windVal + "mph";
      getuvIndex(uvVal, uviVal);

      //document.getElementById("uv-index").innerHTML =
      //"UV Index: " + uvVal + " " + uviVal;

      console.log(nameVal, tempVal, humVal, windVal, newLat, newLong);

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
