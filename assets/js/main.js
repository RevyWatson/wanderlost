console.log("Too much time on our hands");

//map stuff
//variables for map coordinates
const lat = 42.3314;
const long = -83.0458;
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


let marker = L.marker([46.4793246269164, -89.0901290118636]).bindPopup('Agate Falls State Park <br />  Foot Trail to Falls').addTo(userMap)
let marker1 = L.marker([43.9784619243851, -83.207732602845]).bindPopup('Albert E Sleeper State Park <br /> Candlestick Trail" ').addTo(userMap)
let marker2 = L.marker([43.9727345351858, -83.2104157017631]).bindPopup('Albert E Sleeper State Park <br />Deer Run Trail').addTo(userMap)
let marker3 = L.marker([43.9764973763856, -83.2104140617668]).bindPopup('Albert E Sleeper State Park <br /> Huron Trail').addTo(userMap)
let marker4 = L.marker([43.9767778162569, -83.2144651827408]).bindPopup('Albert E Sleeper State Park <br />  Old Dunes Nature Trail').addTo(userMap)
let marker5 = L.marker([42.6332126570088, -82.5199468526433]).bindPopup('Algonac State Park <br />  Bridge to Bay Trail').addTo(userMap)
let marker6 = L.marker([42.6556058673726, -82.5361375623606]).bindPopup('Algonac State Park <br /> Lake Plain Prairie Trail').addTo(userMap)
let marker7 = L.marker([46.4524080692743, -84.4368767513053]).bindPopup('Algonquin Pathway').addTo(userMap)
let marker8 = L.marker([42.573704086012, -86.0412574206891]).bindPopup('Allegan State Game Area <br /> Equestrian Trail EL 2').addTo(userMap)
let marker9 = L.marker([42.5667548258995, -86.0470379418142]).bindPopup('Allegan State Game Area <br />  Equestrian Trail EL1').addTo(userMap)
let marker10 = L.marker([42.5294270041385, -85.9753293923522]).bindPopup('Allegan State Game Area <br /> Equestrian Trail Pine Point/Ely Lake Connector').addTo(userMap)
let allMarkers =[marker, marker1, marker2, marker3, marker4, marker5, marker6, marker7, marker7, marker8, marker9, marker10]

function getTrails() {
    console.log();
    //Trail Data
    const trailData = 'https://services3.arcgis.com/Jdnp1TjADvSDxMAX/ArcGIS/rest/services/open_Trails/FeatureServer/1/query?where=1%3D1&outFields=State_Designated_Trail,Status,Hiking,Hiking_Name,Trail_Network,Miles,Shape__Length&geometry=-119.054%2C38.557%2C-55.773%2C49.561&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json'
    let trailNameEl = document.getElementById("trailName");
    //let trailMiles =trailNameEl.value;
    
  
    fetch(trailData, {
      method: "GET",
      withCredentials: true,
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        console.log(trailData);
        
        //for loop
        let miles = data["features"][0]["attributes"]["Miles"];
        let name = data["features"][0]["attributes"]["Hiking_Name"];
        let status = data["features"][0]["attributes"]["Status"];
        let network = data["features"][0]["attributes"]["Trail_Network"];

        document.getElementById("trailName").innerHTML = name;
        document.getElementById("miles").innerHTML = "Miles: " + miles;
        document.getElementById("status").innerHTML = "Status: " + status;
        document.getElementById("network").innerHTML = "Trail Network: " + network;



        console.log(miles, name, status, network);
      })
      .catch(function (error) {
        console.log(error);
      });
        
  };

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
      const newLat = data["coord"]["lat"];
      const newLong = data["coord"]["lon"];

      userMap.setView([newLat, newLong], zoom);

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
