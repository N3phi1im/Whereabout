(function() {
	'use strict';
	angular.module('app')
	.controller('BusinessController', BusinessController);

	BusinessController.$inject = ['UserFactory', 'HomeFactory', '$state', '$stateParams'];

	function BusinessController(UserFactory, HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.business = {};
		vm.isFollowing = false;
		vm.status = UserFactory.status.id;
	//-------------------------------------------------------------------------//
	if($stateParams.res){
		HomeFactory.getBusinessInfo($stateParams.res).then(function(res){
			console.log(res);
			vm.business = res.place;
			var following = res.following;
			for (var i = 0; i < following.length; i++) {
				if(following[i]._id === vm.status) {
					vm.isFollowing = true;
				}
			}
		});
	}
	//-------------------------------------------------------------------------//




	//-------------------------------------------------------------------------//

	vm.followBusiness = function(id, isFollowing){
		if(vm.isFollowing){
			HomeFactory.followById(id, isFollowing).then(function(res){
			});
		}
		else {
			HomeFactory.removeFollow(id).then(function(res) {
			});
	}

};

//-------------------------------------------------------------------------//
}
})();
