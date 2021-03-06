(function() {
	'use strict';
	angular.module('app')
	.controller('SearchController', SearchController);

	SearchController.$inject = ['HomeFactory', 'uiGmapGoogleMapApi', '$scope', '$window', 'Map', '$state', "$stateParams", "$location"];

	function SearchController(HomeFactory, uiGmapGoogleMapApi, $scope, $window, Map, $state, $stateParams, $location) {
		var vm = this;
		vm.results = Map.placesResults;
		$scope.place = {};

		$scope.goHome = function(){
			Map.init();
		};
		$scope.search = function() {
			var search = $stateParams.search || $scope.searchPlace;
			$scope.apiError = false;
			Map.search(search, $scope.searchDistance)
			.then(
				function(res) {
					for (var i = 0; i < res.length; i++) {
						Map.createMarker(res[i]);
						vm.results.length = 0;
						vm.results.push.apply(vm.results, res);

					}
					if ($stateParams.search) $stateParams.search = null;
				},
				function(status) {
					$scope.apiError = true;
					$scope.apiStatus = status;
				}
				);

		};
		$scope.send = function() {
			console.log($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
		};

//-------------------------------------------------------------------------//

if ($stateParams.search) Map.init(true).then($scope.search);
else  Map.init();
}

})();
