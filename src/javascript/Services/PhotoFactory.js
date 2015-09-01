(function() {
  'use strict';
  angular.module('app')
  .factory('PhotoFactory', PhotoFactory);

  PhotoFactory.$inject = ['HomeFactory', 'Map', 'UserFactory', '$http', '$q'];

  function PhotoFactory(HomeFactory, Map, UserFactory, $http, $q) {
    var o = {};
    var obj = {};
    o.comments = [];
    o.addPhoto = addPhoto;
    o.combinePhotoComment = combinePhotoComment;
    o.getComment = getComment;
    o.populateHome = populateHome;
    o.myPhotos = myPhotos;
    o.deleteCommentById = deleteCommentById;
    o.deletePhoto = deletePhoto;
    return o;


    
    function populateHome() {
      var q = $q.defer();
      $http.post('/api/Places/populate', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        q.resolve(res);
      });
      return q.promise;
    }

    function addPhoto(photo) {
      var q = $q.defer();
      obj.id = photo;
      q.resolve();
      return q.promise;
    }
    
    function combinePhotoComment(comment) {
      var id = obj.id;
      var q = $q.defer();
      $http.post('/api/Comment/add/' + id, {
        comment: comment
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        o.comments.push(res);
        q.resolve(res);
      });
      return q.promise;
    }
    
    function deleteCommentById(photo, id) {

      var q = $q.defer();
      $http.post('/api/Comment/delete/' + id, {photo: photo},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(){
        for(var i = 0; i < o.comments.length; i++) {
          if(o.comments[i]._id === id){
            o.comments.splice(i, 1);
            break;
          }
        }
        q.resolve();
      });

      return q.promise;
    }
    
    function getComment() {
      var id = obj.id;
      var q = $q.defer();
      $http.get('/api/Comment/get/' + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        o.comments.length = 0;
        o.comments.push.apply(o.comments, res);
        q.resolve(res);
      });
      return q.promise;
    }
    
    function myPhotos() {
      var q = $q.defer();
      $http.get('/api/Photos/mine', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        q.resolve(res);
      });
      return q.promise;
    }

    function deletePhoto(id) {
      var q = $q.defer();
      $http.post('/api/Photos/delete', {id:id}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        q.resolve(res);
      });
      return q.promise;
    }
  }
})();
