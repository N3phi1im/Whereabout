(function() {
	'use strict';
	angular.module('app')
	.controller('MyPostController', MyPostController);

	MyPostController.$inject = ['PhotoFactory', 'HomeFactory'];

	function MyPostController(PhotoFactory, HomeFactory) {
		var vm = this;
		vm.mine = [];

		function myPhotos() {
			vm.mine.length = 0;
			PhotoFactory.myPhotos().then(function(res) {
				vm.mine = res;
			});
		}

		myPhotos();
	}
})();
