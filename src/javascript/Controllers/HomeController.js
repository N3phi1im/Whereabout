(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['PhotoFactory', 'HomeFactory', 'UserFactory'];

  function HomeController(PhotoFactory, HomeFactory, UserFactory) {
    var vm = this;
    vm.populateHome();

    vm.upload = function(photo) {
      HomeFactory.upload(photo).then(function() {
        HomeFactory.setPhoto().then(function() {
          HomeFactory.setPlace(id).then(function() {
            state.go('Home');
          });
        });
      });
    };

    vm.populateHome = function() {
      PhotoFactory.populateHome().then(function(res) {
        console.log(res);
      });
    };

  }
})();
