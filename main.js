
var stream = function(){
	var source = new EventSource('stream');

	source.addEventListener('twitter', function(e) {
		var data = JSON.parse(e.data)
		var latlng = new L.LatLng(data.coordinates.coordinates[1],data.coordinates.coordinates[0]);
		var m = new L.Marker(latlng);
		m.bindPopup('<a href = "http://twitter.com/'+data.user.screen_name+'"> <img src="'+data.user.profile_image_url+'" class="profile" /></a> <div id="text">'+data.text+'</div>' ).openPopup();		    
		map.addLayer(m);	
		}, false);


};



//show map 
var map = new L.Map('map');
    
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/c730b9720ac14a97b9f2f1e269905f49/997/256/{z}/{x}/{y}.png',
	cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
	cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
map.setView(new L.LatLng(40.75,-74), 3); //lat long pair
map.addLayer(cloudmade);

       
if (!!window.EventSource) {
	stream();
}



