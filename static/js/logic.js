// We create tile layers that will be the map background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object
let map = L.map('mapid', {
	center: [39.33, -77.74],
	zoom: 5,
	layers: [satelliteStreets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// add layer group for the appalachian trail
let appalachianTrail = new L.LayerGroup();


// create an overlays object with the appalachian trail layer group and whatever other layers I add in
let overlays = {
  "Appalachian Trail": appalachianTrail,
};

// add a control to the map that will allow the user to change which
// layers are visible more layers are added
L.control.layers(baseMaps, overlays).addTo(map);


//variable for the tectonic plate data
let trailData = "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/Appalachian_National_Scenic_Trail/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
  
//Style the data
let myStyle = {
  color: "#ff0000",
  weight: 3
}
  
// Use d3.json to make a call to get our AT geoJSON data.
d3.json(trailData).then(function(data) {
  console.log(data);
//Create a GeoJSON layer with the retrieved data
L.geoJson(data,{
  style: myStyle
}).addTo(appalachianTrail);
appalachianTrail.addTo(map);
});
