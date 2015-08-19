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
		
		this.init = function() {

			$window.navigator.geolocation.getCurrentPosition (
				function (position) {
					lat = position.coords.latitude;
					lng = position.coords.longitude;

					urHere = new google.maps.LatLng(lat, lng);

					var options = {
						center: new google.maps.LatLng(lat, lng),
						zoom: 16,
						disableDefaultUI: true
					};
					map = new google.maps.Map(document.getElementById("map-canvas"), options);
					places = new google.maps.places.PlacesService(map);


					var marker = new google.maps.Marker({
						map: map,
						position: urHere,
					});


				});

		};

		this.deleteMarker = function() {
			for(var i=0; i<gmarkers.length; i++){
				gmarkers[i].setMap(null);
			}

		};

		this.search = function(str, dis) {
			this.init();
			var d = $q.defer();
			var a = str;
			var b = (dis * 1609.34);
			var request = {
				location:  new google.maps.LatLng(lat, lng),
				// radius: 1,
				bounds: map.getBounds(),
				query: a,
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

			this.createMarker = function(place) {
				var placeLoc = place.geometry.location;

				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location,
				});

				gmarkers.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});

				var bounds = new google.maps.LatLngBounds();
				bounds.extend(urHere);
				bounds.extend(place.geometry.location);
				map.fitBounds(bounds);

			};

			return d.promise;
		};

	}
})();