(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory','UserFactory'];

	function HomeController(HomeFactory,UserFactory) {
		var vm = this;
	}
})();