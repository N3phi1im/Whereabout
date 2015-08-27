(function() {
  'use strict';
  angular.module('app')
  .factory('PhotoFactory', PhotoFactory);

  PhotoFactory.$inject = ['Map', 'UserFactory', '$http', '$q'];

  function PhotoFactory(Map, UserFactory, $http, $q) {
    var o = {};
    var obj = {};
    o.addPhoto = addPhoto;
    o.combinePhotoComment = combinePhotoComment;
    o.getComment = getComment;
    return o;

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