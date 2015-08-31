(function() {
  'use strict';
  angular.module('app')
  .controller('AddCommentController', AddCommentController);

  AddCommentController.$inject = ['$modal','PhotoFactory','UserFactory', 'HomeFactory', '$window','$state', '$stateParams', 'photo'];

  function AddCommentController($modal, PhotoFactory, UserFactory, HomeFactory, $window, $state, $stateParams, photo) {
    var vm = this;
    vm.photo = photo;

    vm.createComment = function(comment) {
      PhotoFactory.combinePhotoComment(comment).then(function(res){

      });
    };



  }
})();