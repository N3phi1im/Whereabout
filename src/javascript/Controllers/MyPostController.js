(function() {
	'use strict';
	angular.module('app')
	.controller('MyPostController', MyPostController);

	MyPostController.$inject = ['PhotoFactory', 'HomeFactory'];

	function MyPostController(PhotoFactory, HomeFactory) {
		var vm = this;
		vm.mine = [];
		vm.deletePhoto = deletePhoto;

		function myPhotos() {
			vm.mine.length = 0;
			PhotoFactory.myPhotos().then(function(res) {
				vm.mine = res;
			});
		}

		function deletePhoto(id) {
			PhotoFactory.deletePhoto(id).then(function(res) {
				for (var i = 0; i < vm.mine.length; i++) {
					if(vm.mine[i]._id === id) {
						vm.mine.splice(i, 1);
					}
				}
			});
		}

		myPhotos();
	}
})();
