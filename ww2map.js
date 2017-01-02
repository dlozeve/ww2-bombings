var grayscale = L.tileLayer('https://api.mapbox.com/styles/v1/deltux/cix9hxd7600az2pohc8aebhn1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVsdHV4IiwiYSI6ImNpdzB4dHhqcDAwMXoyb280c3VyZjVpZmYifQ.8A9IxhBEga9lI1h2zUDSgg');
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/deltux/cix9hq0il00f42qo9ru2lvi10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVsdHV4IiwiYSI6ImNpdzB4dHhqcDAwMXoyb280c3VyZjVpZmYifQ.8A9IxhBEga9lI1h2zUDSgg');
var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/deltux/cixbspsw000i62pnwypfx86p0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVsdHV4IiwiYSI6ImNpdzB4dHhqcDAwMXoyb280c3VyZjVpZmYifQ.8A9IxhBEga9lI1h2zUDSgg');
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');


var geojsonMarkerOptions = {
    // radius: 6,
    // color: "#000",
    // weight: 1,
    // opacity: 1,
    stroke: false,
    fillColor: "#ff3000",
    fillOpacity: 0.7
};

function onEachFeature(feature, layer) {
    if (feature.properties) {
	if (feature.properties.TOTAL_TONS) {
	    layer.setRadius(Math.sqrt(feature.properties.TOTAL_TONS) * 100);
	}
	if (feature.properties.TGT_LOCATION) {
	    layer.bindPopup(feature.properties.TGT_LOCATION);
	}
    }
}

var geojson = L.geoJSON(bombings, {
    pointToLayer: function (feature, latlng) {
        return L.circle(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
});

var map = L.map('map', {
    center: [48.68, 4.9],
    zoom: 7,
    layers: [osm, geojson]});

var baseMaps = {
    // "Grayscale": grayscale,
    // "Streets": streets,
    // "Satellite": satellite,
    "OSM": osm
};

var overlayMaps = {
    "WWII Bombings": geojson
};

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);
		
L.control.scale().addTo(map);
