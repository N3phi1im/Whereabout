(function() {
	'use strict';
	angular.module('app')
	.controller('ResetController', ResetController);

	ResetController.$inject = ['HomeFactory', 'UserFactory', '$state', '$stateParams'];

	function ResetController(HomeFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		vm.changePassword = changePassword;


		function changePassword(pass) {
			pass.id = $state.params.token;
			pass.guid = $state.params.code;
			UserFactory.changePass(pass).then(function(res) {
				console.log(res);
				$state.go('Welcome');
			});
		}


	}
})();
