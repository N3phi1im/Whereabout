(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory','UserFactory'];

	function HomeController(HomeFactory,UserFactory) {
		var vm = this;

		vm.upload = function() {
			HomeFactory.upload().then(function() {
				HomeFactory.setPhoto().then(function() {
					HomeFactory.setPlace().then(function() {
						state.go('Home');
					});
				});
			});
		};
	}
})();
