(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.upload = upload;
		o.setPhoto = setPhoto;
		o.setPlace = setPlace;
		o.uploadLocation = uploadLocation;
		return o;

		function upload(photo) {
			var q = $q.defer();
			$http.post('/api/Photos/upload', photo).success(function(req, res) {
				q.resolve(res);
			});
			return q.promise;
		}
		function uploadLocation(location) {
			console.log(location);
			var q = $q.defer();
			$http.post('/api/Places/Place', location).success(function(req, res) {
				q.resolve(res);
			});
			return q.promise;
		}

		function setPhoto() {
			var q = $q.defer();
			$http.post('/api/Photos/setPhoto').success(function() {
				q.resolve();
			});
			return q.promise;
		}

		function setPlace() {
			var q = $q.defer();
			$http.post('/api/Photos/setPlace').success(function() {
				q.resolve();
			});
			return q.promise;
		}
	}
})();
