(function() {
  'use strict';
  angular.module('app')
  .controller('BusinessController', BusinessController);

  BusinessController.$inject = ['PhotoFactory','UserFactory', 'HomeFactory', '$state', '$stateParams'];

  function BusinessController(PhotoFactory, UserFactory, HomeFactory, $state, $stateParams) {
    console.log("Loaded");
    var vm = this;
    vm.business = {};
    vm.isFollowing = false;
    vm.status = UserFactory.status.id;
    var obj = {};
    vm.comments = {};
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
        }
      });
    }

    //-------------------------------------------------------------------------//


    vm.followBusiness = function(id, isFollowing) {
      if (vm.isFollowing) {
        HomeFactory.followById(id, isFollowing).then(function(res) {});
      } else {
        HomeFactory.removeFollow(id).then(function(res) {});
      }

    };

    //-------------------------------------------------------------------------//
    vm.goToComment = function(photo) {
      $state.go('Dummy');
      PhotoFactory.addPhoto(photo).then(function(){
        PhotoFactory.getComment().then(function(res){
          vm.comments = res;
          console.log(vm.comments);
        }); 
      });
    };


    //-------------------------------------------------------------------------//
    vm.createComment = function(comment) {
      PhotoFactory.combinePhotoComment(comment).then(function(res){
        PhotoFactory.getComment().then(function(res){
          console.log(res);
          vm.comments = res;
        });
      });
    };

    //-------------------------------------------------------------------------//




    //-------------------------------------------------------------------------//
  }
})();
