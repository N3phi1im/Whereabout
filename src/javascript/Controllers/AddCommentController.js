(function() {
  'use strict';
  angular.module('app')
  .controller('AddCommentController', AddCommentController);

  AddCommentController.$inject = ['$scope', '$modal','PhotoFactory','UserFactory', 'HomeFactory', '$window','$state', '$stateParams', 'photo', '$modalInstance'];

  function AddCommentController($scope, $modal, PhotoFactory, UserFactory, HomeFactory, $window, $state, $stateParams, photo, $modalInstance) {
    var vm = this;
    vm.photo = photo;
    vm.comments = photo.comments;
    vm.status = UserFactory.status;

//CREATE A COMMENT AND GET THAT COMMENT

vm.createComment = function(comment) {
  PhotoFactory.combinePhotoComment(comment).then(function(res){
   PhotoFactory.getComment().then(function(res){
    vm.comments.push(res.comments[res.comments.length - 1]);
    vm.commentBody = "";
  });
 });
};


vm.deleteComment = function(photo, commentId) {
  PhotoFactory.deleteCommentById(photo, commentId).then(function(res){
   PhotoFactory.getComment().then(function(res){
    for(var i = 0; i < res.comments.length; i++) {
      if(vm.comments[i]._id === commentId) {
        vm.comments.splice(i, 1);
      }
    }
  });
 });
};

vm.okay =function() {
  $modalInstance.dismiss();
};

}})();