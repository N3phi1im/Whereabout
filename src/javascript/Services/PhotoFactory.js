(function() {
  'use strict';
  angular.module('app')
  .factory('PhotoFactory', PhotoFactory);

  PhotoFactory.$inject = ['HomeFactory', 'Map', 'UserFactory', '$http', '$q'];

  function PhotoFactory(HomeFactory, Map, UserFactory, $http, $q) {
    var o = {};
    var obj = {};
    o.addPhoto = addPhoto;
    o.combinePhotoComment = combinePhotoComment;
    o.getComment = getComment;
    o.populateHome = populateHome;

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
//-------------------------------------------------------------------------//
function  addPhoto(photo) {
  var q = $q.defer();
  obj.id = photo.id;
  q.resolve();
  return q.promise;
}
//-------------------------------------------------------------------------//
function combinePhotoComment(comment) {
  var id = obj.id;
  var q = $q.defer();
  $http.post('/api/Comment/add/'+ id, {comment: comment}, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token')}}).success(function(res){
        q.resolve(res);
      });
      return q.promise;
    }
    
//-------------------------------------------------------------------------//
function getComment() {
  var id = obj.id;
  var q = $q.defer();
  $http.get('/api/Comment/get/'+ id).success(function(res){
    q.resolve(res);
  });
  return q.promise;
}
//-------------------------------------------------------------------------//
}
})();


