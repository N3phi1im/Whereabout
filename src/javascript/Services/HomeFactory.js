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
		o.getLocation = getLocation;
		return o;

		function upload(photo) {
			var q = $q.defer();
			$http.post('/api/Photos/upload', photo).success(function(req, res) {
				q.resolve(res);
			});
			return q.promise;
		}
		function uploadLocation(location) {
			var q = $q.defer();
			$http.post('/api/Places/Place', location).success(function(req, res) {
				q.resolve(res);
			});
			return q.promise;
		}


		function getLocation(id) {
			var q = $q.defer();
			$http.get('/api/Places/Place/info', id).success(function(req, res) {
				q.resolve(res);
			});
			return q.promise;
		}

		function setPhoto(photo) {

			var q = $q.defer();
			$http.post('/api/Photos/setPhoto', photo).success(function() {
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

		function getBusinessINfo() {
			var q = $q.defer();
			$http.get('/' + id).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

	}
})();
