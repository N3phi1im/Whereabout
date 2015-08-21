(function() {
	'use strict';
	angular.module('app')
	.controller('TakePhotoController', TakePhotoController);

	TakePhotoController.$inject = ['$scope','$state','HomeFactory','UserFactory'];

	function TakePhotoController($scope, $state, HomeFactory,UserFactory) {
		var vm = this;
//---------------------------------------------------------------------------//
		$scope.customer = {};
		$scope.Submit = function(){
			var uploadUrl = '/upload';
			multipartForm.post(uploadUrl, $scope.customer)
		}



}
})();