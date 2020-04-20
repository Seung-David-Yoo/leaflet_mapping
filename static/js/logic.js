
var myMap=L.map("map",{
	center:[0, 0],
	zoom: 2
});


L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";



function circle_maker(features, fill, rad){
	var circle = L.shapeMarker([features.geometry.coordinates[1], features.geometry.coordinates[0]], {
				fillColor: fill,
				fillOpacity: 0.75,
				color: "white",
				weight: 0.7,
				shape: "circle",
				radius: rad
		}).bindPopup("<h3>" + features.properties.place +
      "</h3><hr><p>" +"<strong>Date<strong>:"+ new Date(features.properties.time) + "</p>" + "<hr><p>"
       + "<strong>Richter Magnitude:<strong> " + features.properties.mag + "</p>");

	return circle;
} 

var colors=["green", "yellow","orange", "pink", "red", "purple"];

d3.json(url).then(function(data){
	
	
	data.features.forEach((features=>{

		var mag = features.properties.mag;
		var coords = [features.geometry.coordinates[1], features.geometry.coordinates[0]]

		if (coords)
			if (mag<1){
				var circle=circle_maker(features,colors[0], 2*mag)
			}
			else if (mag<2){
				var circle=circle_maker(features,colors[1], 3*mag)
			}
			else if (mag<3){
				var circle=circle_maker(features,colors[2], 4*mag)
			}
			else if (mag <4){
				var circle=circle_maker(features,colors[3], 5*mag)
			}
			else if (mag<5){
				var circle=circle_maker(features,colors[4], 6*mag)
			}
			else{
				var circle=circle_maker(features,colors[5], 7*mag)
			}
			circle.addTo(myMap)

})) 
	
}
);





var legend = L.control({position: 'bottomright'});
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    var grade=[0,1,2,3,4,5]
    var categories = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    div.innerHTML += '<strong> Eearthquake Richter Magnitude<strong><br>';
    for (var i = 0; i <  colors.length; i++) {

        
       	div.innerHTML += '<i style="background:' + colors[i]+ '"></i>'+ categories[i]+ '<br>';
    }

    return div;
};

legend.addTo(myMap);
