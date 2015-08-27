(function() {
	'use strict';
	angular.module('app')
	.service('Map', Map);

	Map.$inject = ['$q','uiGmapGoogleMapApi', '$window'];

	function Map($q, uiGmapGoogleMapApi, $window) {
		var infowindow;
		var lat;
		var lng;
		var places;
		var map;
		var gmarkers = [];
		var urHere;
		var placesResults = [];
		this.placesResults = placesResults;

		this.init = function(promise) {
			var q;
			if(promise) q = $q.defer();
			$window.navigator.geolocation.getCurrentPosition (
				function (position) {
					lat = position.coords.latitude;
					lng = position.coords.longitude;

					urHere = new google.maps.LatLng(lat, lng);

					var options = {
						center: new google.maps.LatLng(lat, lng),
						zoom: 15,
						disableDefaultUI: true,
						styles : [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#e94f3f"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"gamma":"0.50"},{"hue":"#ff4a00"},{"lightness":"-79"},{"saturation":"-86"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#ff1700"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"all","stylers":[{"color":"#e74231"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#4d6447"},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"color":"#f0ce41"},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#363f42"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#231f20"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#6c5e53"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#313639"},{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"hue":"#ff0000"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#0e171d"}]}]
					};
					map = new google.maps.Map(document.getElementById("map-canvas"), options);
					places = new google.maps.places.PlacesService(map);

					var image = '/img/1440148739_Map-Marker-Board-Azure.png';
					var marker = new google.maps.Marker({
						map: map,
						icon: image,
						position: urHere,
					});
					if(promise) q.resolve();
				});

if(promise) return q.promise;

};

this.deleteMarker = function() {
	for(var i=0; i<gmarkers.length; i++){
		gmarkers[i].setMap(null);
	}

};

this.search = function(str, dis) {
	var d = $q.defer();
	var place = str;
	var request = {
		location:  new google.maps.LatLng(lat, lng),
		radius: 1000,
		bounds: map.getBounds(),
		query: place,
		rankBy: google.maps.places.RankBy.DISTANCE,

	};
	this.deleteMarker();

	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callback);

	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			d.resolve(results);
		}
	}
	var image2 = '/img/1440149027_Map-Marker-Marker-Inside-Azure.png';
	this.createMarker = function(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			icon: image2,
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});

		gmarkers.push(marker);

		var bounds = new google.maps.LatLngBounds();
		bounds.extend(place.geometry.location);
		bounds.extend(urHere);
		map.fitBounds(bounds);

	};

	return d.promise;
};

}
})();
