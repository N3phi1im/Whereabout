(function() {
	'use strict';
	angular.module('app')
	.controller('SearchController', SearchController);

	SearchController.$inject = ['HomeFactory', 'uiGmapGoogleMapApi', '$scope', '$window', 'Map', '$state'];

	function SearchController(HomeFactory, uiGmapGoogleMapApi, $scope, $window, Map, $state) {
		var vm = this;

		$scope.place = {};

		$scope.goHome = function(){
			Map.init();
		};
		$scope.search = function() {
			$scope.apiError = false;
			Map.search($scope.searchPlace, $scope.searchDistance)
			.then(
				function(res) { 
       				 	// success
       				 	for (var i = 0; i < res.length; i++) {
       				 		Map.createMarker(res[i]);
       				 	}
       				 },
        			function(status) { // error
        				$scope.apiError = true;
        				$scope.apiStatus = status;
        			}
        			);

		};
		$scope.send = function() {
			console.log($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
		};
		Map.init();

	}
})();