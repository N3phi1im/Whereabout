(function() {
  'use strict';
  angular.module('app')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$stateParams','PhotoFactory', 'HomeFactory', 'UserFactory'];

  function HomeController($stateParams, PhotoFactory, HomeFactory, UserFactory) {
    var vm = this;
    vm.info = {};
    vm.status = UserFactory.status.id;
    vm.indlike = Number;

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
        vm.info = res;
        for(var followIndex = 0; followIndex < vm.info.follow.length; followIndex++) {
          for(var photoIndex = 0; photoIndex < vm.info.follow[followIndex].photos.length; photoIndex++) {
            for(var likeIndex = 0; likeIndex < vm.info.follow[followIndex].photos[photoIndex].likes.length; likeIndex++) {
              if(vm.info.follow[followIndex].photos[photoIndex].likes[likeIndex]._id === UserFactory.status.id) {
                vm.info.follow[followIndex].photos[photoIndex].userLike = true;
                break;
              }
            }
          }
        }
      });
    };
    vm.populateHome();


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

    vm.plusOne = function(follow, photo) {
      vm.info.follow[follow].photos[photo].likes.length +=1;
    };




  }
})();
