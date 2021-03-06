console.log("Too much time on our hands");

const userMap = L.map('cityMapId').setView([51.505, -0.09], 13);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, [attribution]);
tiles.addTo(userMap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';