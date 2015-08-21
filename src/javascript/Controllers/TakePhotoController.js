(function() {
	'use strict';
	angular.module('app')
	.controller('TakePhotoController', TakePhotoController);

	TakePhotoController.$inject = ['$state','HomeFactory','UserFactory'];

	function TakePhotoController($state, HomeFactory,UserFactory) {
		var vm = this;

		vm.upload = function(photo) {
			console.log(photo);
			HomeFactory.upload(photo).then(function() {
				// HomeFactory.setPhoto().then(function() {
				// 	HomeFactory.setPlace(id).then(function() {
					$state.go('Home');
				});
		// 		});
		// 	});
};
}
})();