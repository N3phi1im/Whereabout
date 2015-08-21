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
<<<<<<< HEAD
		o.dataObject ={};
=======
		o.getLocation = getLocation;
>>>>>>> 3e6a9778f71dfabb213679367de6dfc93ce15d1e
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
<<<<<<< HEAD
				o.dataObject = location.id;
				q.resolve();
=======
				q.resolve();
			});
			return q.promise;
		}

		function getLocation(id) {
			var q = $q.defer();
			$http.get('/api/Places/Place/info', id).success(function(req, res) {
				q.resolve(res);
>>>>>>> 3e6a9778f71dfabb213679367de6dfc93ce15d1e
			});
			return q.promise;
		}

<<<<<<< HEAD
		function setPhoto() {
=======
		function setPhoto(photo) {

>>>>>>> 3e6a9778f71dfabb213679367de6dfc93ce15d1e
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

		function getBusinessINfo() {
			var q = $q.defer();
			$http.get('/' + id).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}

	}
})();
