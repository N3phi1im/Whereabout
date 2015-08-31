(function() {
  'use strict';
  angular.module('app')
  .controller('BusinessController', BusinessController);

  BusinessController.$inject = ['$modal','PhotoFactory','UserFactory', 'HomeFactory', '$window','$state', '$stateParams'];

  function BusinessController($modal, PhotoFactory, UserFactory, HomeFactory, $window, $state, $stateParams) {
    var vm = this;
    vm.business = {};
    vm.isFollowing = false;
    vm.status = UserFactory.status.id;
    var obj = {};
    vm.indlike = Number;

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
            for(var s = 0; s < res.place.photos[e].likes.length; s += 1) {
              if(res.place.photos[e].likes[s]._id === vm.status) {
                res.place.photos[e].userLike = true;
              } else {
              }
            }
          }
        }
      });
}

//OPEN ADD COMMENT MODAL
vm.openModal = function (photo) {
  PhotoFactory.addPhoto(photo).then(function(){
    PhotoFactory.getComment().then(function(res){
      var instance = $modal.open({
        controller: 'AddCommentController',
        controllerAs: "vm",
        templateUrl: './../views/AddCommentModal.html',
        resolve: {
          photo: function() {
            return res;
          }
        }
      });
      instance.result.then(function(c) {
      });
    });
  });
};


//CHANGE THE 'FOLLOW/FOLLOWING' STATE
vm.followBusiness = function(id, isFollowing) {
  if (vm.isFollowing) {
    HomeFactory.followById(id, isFollowing).then(function(res) {});
  } else {
    HomeFactory.removeFollow(id).then(function(res) {});
  }
};

//ADD A LIKE BY PHOTO ID AND GET LIKES BY THAT PHOTO ID
vm.addLike = function(id) {
  HomeFactory.sendLike(id._id).then(function(res) {
    HomeFactory.getLikes(id._id).then(function(res){
      var index = res[0];
      id.userLike = true;
      for(var e = 0; e < index.likes.length; e += 1) {
        index.likes[e].userLike = false;
      }
      for(var s = 0; s < index.likes.length; s += 1) {
        if(index.likes[s]._id === vm.status) {
          index.likes[s].userLike = true;
          vm.indlike = s;
        } else {
        }
      }
    });
  });
};

HomeFactory.getLikes();



vm.plusOne = function(photo) {
  for (var i = 0; i < vm.business.photos.length; i++) {
    if(vm.business.photos[i]._id === photo) {
      vm.business.photos[i].likes.length +=1;

    }
  }
};






}
})();
