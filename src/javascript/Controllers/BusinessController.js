(function() {
  'use strict';
  angular.module('app')
    .controller('BusinessController', BusinessController);

  BusinessController.$inject = ['HomeFactory', '$state', '$stateParams'];

  function BusinessController(HomeFactory, $state, $stateParams) {
    var vm = this;
    vm.business = {};

    //-------------------------------------------------------------------------//
    if ($stateParams.res) {
      HomeFactory.getBusinessInfo($stateParams.res).then(function(res) {
        console.log(res);
        vm.business = res;

      });
    }
    //-------------------------------------------------------------------------//
    vm.followBusiness = function(id) {
      HomeFactory.followById(id).then(function(res) {});
    };

    vm.alert = function() {
      alert(1);
    };

    vm.alert2 = function() {
      alert(2);
    };
  }
})();
