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
    "OSM": osm
};

var overlayMaps = {
    "WWII Bombings": geojson
};

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);
		
L.control.scale().addTo(map);
