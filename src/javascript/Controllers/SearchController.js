(function() {
	'use strict';
	angular.module('app')
	.controller('SearchController', SearchController);

	SearchController.$inject = ['HomeFactory'];

	function SearchController(HomeFactory) {
		var vm = this;
	}
})();