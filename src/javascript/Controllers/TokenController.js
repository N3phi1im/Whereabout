(function() {
	'use strict';
	angular.module('app')
	.controller('TokenController', TokenController);

	TokenController.$inject = ['HomeFactory', 'UserFactory', 'token', '$state'];

	function TokenController(HomeFactory, UserFactory, token, $state) {
		var vm = this;

		UserFactory.setToken(token);
		UserFactory.status.isLoggedIn = true;
		$state.go('Home');
	}
})();
