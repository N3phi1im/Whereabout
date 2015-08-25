(function() {
	'use strict';
	angular.module('app')
	.controller('BusinessController', BusinessController);

	BusinessController.$inject = ['HomeFactory', '$state', '$stateParams'];

	function BusinessController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.business = {};
		vm.isFollowing = false;
	//-------------------------------------------------------------------------//
	if($stateParams.res){
		HomeFactory.getBusinessInfo($stateParams.res).then(function(res){
			console.log(res);
			vm.business = res;

		});
	}

//-------------------------------------------------------------------------//
vm.alert = function(id, isFollowing) {
	if(vm.isFollowing){
		console.log(id, isFollowing);
		HomeFactory.followById(id, isFollowing).then(function(res){
		});
	}
	else
		{console.log('other');
}
};






//-------------------------------------------------------------------------//	
}
})();


