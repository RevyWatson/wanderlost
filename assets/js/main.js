console.log("Too much time on our hands");
//map stuff
//variables for map coordinates
const lat = 51.505
const long = -0.09
const zoom = 13


//variable for map
const userMap = L.map('cityMapId').setView([lat, long], zoom);

//attribution variable
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//varriables for map photo tiles
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, [attribution]);

//function adding tiles to map

tiles.addTo(userMap);
//openstree api data retrieval function
function getApi(userCity) {
    console.log(userCity);
    let destinationEl = document.getElementById("destination");
    let finalDestination = destinationEl.value;
    console.log(finalDestination);

    fetch(titleUrl, {
      method: "GET",
      withCredentials: true
    })
      .then(response => response.json())
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
const form = document.getElementById('search-form');

let cityName = localStorage.getItem("cityName");
let cities = [];

//listen for when submit button is clicked
form.addEventListener('submit', logSubmit);

function logSubmit(event) {
  log.textContent = `Form Submitted!`;
  event.preventDefault();
  let userCity = cityInput.value;
  localStorage.setItem("cityName", userCity);
  getApi(userCity);
}


//function that retrieves data from third-party api for a specific location
function getApi(userCity) {
  console.log(userCity);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=23862a5f23b4f0870e633a28562d8b34";  fetch(url, {
    method: "GET",
    withCredentials: true
  })
    .then(response => response.json())
    .then(function (data) {
      console.log(data);
  
      const nameVal = data['name'];
      const tempVal = data['main']['temp'];
      const humVal = data['main']['humidity'];
      const windVal = data['wind']['speed'];
      const uvVal = data['coord']['lat']
      const uviVal = data['coord']['lon']
    
      document.getElementById("name").innerHTML = "name: " + nameVal;
      console.log("nameVal");
      document.getElementById("temp").innerHTML = "Tempature: " + tempVal;
      document.getElementById("humidity").innerHTML = "Humidity: " + humVal;
      document.getElementById("wind-speed").innerHTML = "Wind Speed: " + windVal;
      document.getElementById("uv-index").innerHTML = "UV Index: " + uvVal + " " + uviVal;

      console.log(nameVal, tempVal, humVal, windVal, uvVal, uviVal);
      if (windVal > 5) {
        document.getElementById('main').className = "fas fa-wind";
        document.getElementById('main').innerHTML = "feels windy";
      }
      else {
        document.getElementById('main').className = "fas fa-sun";
        document.getElementById('main').innerHTML = "feels nice";
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

getApi();



// This is a check note to make sure it copied over