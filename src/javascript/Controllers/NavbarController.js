(function() {
	'use strict';
	angular.module('app')
	.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['UserFactory', '$state', '$scope','$anchorScroll', '$location'];

	function NavbarController(UserFactory, $state, $scope, $anchorScroll, $location) {
		var vm = this;
		vm.user = {};
		vm.status = UserFactory.status;
		vm.register = register;
		vm.login = login;
		vm.logout = UserFactory.logout;


		function register() {
			var u = vm.user;
			if(!u.username || !u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
				return false;
			}
			UserFactory.register(u).then(function() {
				$state.go('Home');
			});
		}
		function login() {
			UserFactory.login(vm.user).then(function() {
				$state.go('Home');
			});
		}

		vm.scrollTo = function(id) {
			$location.hash(id);
			console.log($location.hash());
			$anchorScroll();
		};

	}
})();
