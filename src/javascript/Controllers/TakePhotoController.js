(function() {
	'use strict';
	angular.module('app')
	.controller('TakePhotoController', TakePhotoController);

	TakePhotoController.$inject = ['HomeFactory','UserFactory'];

	function TakePhotoController(HomeFactory,UserFactory) {
		var vm = this;
		vm.upload = function(photo) {
			console.log(photo);
			HomeFactory.upload(photo).then(function() {
				HomeFactory.setPhoto().then(function() {
					HomeFactory.setPlace(id).then(function() {
						state.go('Home');
					});
				});
			});
		};
	}
})();
