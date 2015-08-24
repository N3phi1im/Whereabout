(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['UserFactory','$http', '$q'];

	function HomeFactory(UserFactory, $http, $q) {
		var o = {};
		o.upload = upload;
		o.setPhoto = setPhoto;
		o.combinePhotoPlace = combinePhotoPlace;
		o.uploadLocation = uploadLocation;
		o.dataObject ={};
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
				o.dataObject = location.id;
				q.resolve();

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

		function setPhoto(file) {
			var q = $q.defer();
			var photo = {};
			photo.id = file.public_id;
			photo.url = file.url;
			$http.post('/api/Photos/setPhoto', photo, {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).success(function(res) {

				q.resolve(res);
			});
			return q.promise;
		}

		function combinePhotoPlace(file) {
			var q = $q.defer();
			var place = {};
			place.id = file.id;
			place.google =  o.dataObject;
			$http.post('/api/Photos/setPlace', place).success(function() {
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
