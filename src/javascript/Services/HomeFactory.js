(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.upload = upload;
		return o;

		function upload() {
			$http.post('/api/Photos/upload');
		}
	}
})();
