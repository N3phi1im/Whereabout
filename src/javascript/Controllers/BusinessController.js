(function() {
	'use strict';
	angular.module('app')
	.controller('BusinessController', BusinessController);

	BusinessController.$inject = ['HomeFactory'];

	function BusinessController(HomeFactory) {
		var vm = this;
		
	}
})();