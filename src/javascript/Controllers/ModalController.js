(function() {
	'use strict';
	angular.module('app')
	.controller('ModalController', ModalController);

	ModalController.$inject = ['UserFactory'];

	function ModalController(UserFactory) {
		var vm = this;
	}
})();