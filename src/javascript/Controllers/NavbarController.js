(function() {
	'use strict';
	angular.module('app')
	.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['UserFactory', '$state', '$scope', '$anchorScroll', '$location'];

	function NavbarController(UserFactory, $state, $scope, $anchorScroll, $location) {
		var vm = this;
		vm.user = {};
		vm.status = UserFactory.status;
		vm.register = register;
		vm.login = login;
		vm.logout = logout;
		vm.resetPass = resetPass;
		vm.update = update;

		function register() {
			var u = vm.user;
			if (!u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
				return false;
			}
			UserFactory.register(u).then(function() {
				$state.go('Home');
			});
		}

		function update() {
			var u = vm.user;
			// if(!u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
			// 	return false;
			// }
			console.log(u);
			UserFactory.update(u).then(function() {
				$state.go('Home');
			});
		}
		function login() {
			UserFactory.login(vm.user).then(function() {
				$state.go('Home');
			});
		}

		function logout() {
			UserFactory.logout();
			$state.go('Welcome');
		}

		function resetPass(email) {
			var request = {};
			UserFactory.checkEmail(email).then(function(res1) {
				UserFactory.generate(res1).then(function(res2) {
					if (res2 === undefined) {
						alert('No Account exists with that Email.');
					}
					else {
						request.email = email;
						request.id = res1;
						request.guid = res2;
						UserFactory.resetPass(request).then(function(res3) {

						});
					}
				});
			});
		}

		vm.scrollTo = function(id) {
			$location.hash(id);
			console.log($location.hash());
			$anchorScroll();
		};

	}
})();
