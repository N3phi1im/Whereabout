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
