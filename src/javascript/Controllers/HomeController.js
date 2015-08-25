(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory','UserFactory'];

	function HomeController(HomeFactory,UserFactory) {
		var vm = this;
//-----------------------------------------------------------//
vm.upload = function(photo) {
	HomeFactory.upload(photo).then(function() {
		HomeFactory.setPhoto().then(function() {
			HomeFactory.setPlace(id).then(function() {
				state.go('Home');
			});
		});
	});
};
	//-----------------------------------------------------------//

	
}
})();
