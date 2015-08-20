(function() {
	'use strict';
	angular.module('app')
	.factory('PlacesFactory', PlacesFactory);

	PlacesFactory.$inject = ['$http', '$q'];

	function PlacesFactory($http, $q) {
		var o = {};
		return o;

	}
})();
