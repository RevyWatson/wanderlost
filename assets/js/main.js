console.log("Too much time on our hands");

//copywrite attribution reqs
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//variable data needed to display map
const userMap = L.map('cityMapId').setView([51.505, -0.09], 13);
//conecting url for image tiles
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, [attribution]);
//display chosen photo tiles to map
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

getApi();