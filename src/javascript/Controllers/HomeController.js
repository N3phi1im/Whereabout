(function() {
  'use strict';
  angular.module('app')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$stateParams','PhotoFactory', 'HomeFactory', 'UserFactory'];

  function HomeController($stateParams, PhotoFactory, HomeFactory, UserFactory) {
    var vm = this;
    vm.info = {};
//-------------------------------------------------------------------------//
vm.upload = function(photo) {
  HomeFactory.upload(photo).then(function() {
    HomeFactory.setPhoto().then(function() {
      HomeFactory.setPlace(id).then(function() {
        state.go('Home');
      });
    });
  });
};
//-------------------------------------------------------------------------//
vm.populateHome = function() {
  PhotoFactory.populateHome().then(function(res) {
    vm.info = res;
  });
};

vm.populateHome();
//-------------------------------------------------------------------------//

vm.addLike = function(id) {
  // location.reload();
  HomeFactory.sendLike(id).then(function(res) {
  });
};
//-------------------------------------------------------------------------//
if ($stateParams.res) {
  HomeFactory.getBusinessInfo($stateParams.res).then(function(res) {
    if (!res.place) {
      HomeFactory.makeBusiness(res).then(function(response) {
        vm.business = response.place;
        var following = response.following;
        for (var i = 0; i < following.length; i++) {
          if (following[i]._id === vm.status) {
            vm.isFollowing = true;
          }
        }
      });
    } else {
      vm.business = res.place;
      var following = res.following;
      for (var i = 0; i < following.length; i++) {
        if (following[i]._id === vm.status) {
          vm.isFollowing = true;
        }
      }
      for(var e = 0; e < res.place.photos.length; e += 1) {
        res.place.photos[e].userLike = false;
        for(var s = 0; s < res.place.photos[e]["likes"].length; s += 1) {
          if(res.place.photos[e].likes[s]._id === vm.status) {
            res.place.photos[e].userLike = true;
          } else {
            console.log("You do not like this. No.");
            console.log(vm.info);
          }
        }
      }
    }
  });
}
//-------------------------------------------------------------------------//
}
})();
