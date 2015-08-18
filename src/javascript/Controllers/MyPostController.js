(function() {
	'use strict';
	angular.module('app')
	.controller('MyPostController', MyPostController);

	MyPostController.$inject = ['HomeFactory'];

	function MyPostController(HomeFactory) {
		var vm = this;
	}
})();