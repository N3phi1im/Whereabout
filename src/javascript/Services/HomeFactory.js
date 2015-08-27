(function() {
  'use strict';
  angular.module('app')
    .factory('HomeFactory', HomeFactory);

  HomeFactory.$inject = ['Map', 'UserFactory', '$http', '$q'];

  function HomeFactory(Map, UserFactory, $http, $q) {
    var o = {};
    o.upload = upload;
    o.setPhoto = setPhoto;
    o.combinePhotoPlace = combinePhotoPlace;
    o.uploadLocation = uploadLocation;
    o.getBusinessInfo = getBusinessInfo;
    o.followById = followById;
    o.removeFollow = removeFollow;
    o.makeBusiness = makeBusiness;
    return o;

    function upload(photo) {
      var q = $q.defer();
      $http.post('/api/Photos/upload', photo).success(function(req, res) {
        q.resolve(res);
      });
      return q.promise;
    }

    function uploadLocation(location) {
      var q = $q.defer();
      $http.post('/api/Places/Place', location).success(function(req, res) {
        q.resolve();

      });
      return q.promise;
    }


    function setPhoto(file) {
      var q = $q.defer();
      var photo = {};
      photo.title = file.title;
      photo.id = file.public_id;
      photo.url = file.url;
      $http.post('/api/Photos/setPhoto', photo, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {

        q.resolve(res);
      });
      return q.promise;
    }

    function combinePhotoPlace(file, location) {
      var q = $q.defer();
      var place = {};
      place._id = file._id;
      place.id = file.id;
      place.google = location.id;
      $http.post('/api/Photos/setPlace', place).success(function() {
        q.resolve();
      });
      return q.promise;
    }

    function getBusinessInfo(id) {
      var q = $q.defer();
      $http.get('/api/Places/checkLocation/' + id).success(function(data) {
        if (data.exists === false) {
          var selectedPlace = {};
          var results = Map.placesResults;
          for (var i = 0; i <= results.length; i++) {
            if (id === results[i].id) {
              selectedPlace = results[i];
              break;
            } else {}
          }
          q.resolve(selectedPlace);
        } else {
          $http.get('/api/Places/place/info/' + id).success(function(data) {
            q.resolve(data);
          });
        }
      });
      return q.promise;
    }


    function makeBusiness(resPlace) {
      var q = $q.defer();
      $http.post('/api/Places/Place', resPlace).success(function(res, req, id) {
        $http.get('/api/Places/place/info/' + resPlace.id).success(function(data) {
          q.resolve(data);
        });
      });
      return q.promise;
    }


    function followById(id, isFollowing) {
      var q = $q.defer();
      $http.post('/api/Places/follow/' + id, {
        isFollowing: isFollowing
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        q.resolve(res);
      });
      return q.promise;
    }

    function removeFollow(id) {
      var q = $q.defer();
      $http.post('/api/Places/unfollow/' + id, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        console.log(res);
        q.resolve(res);
      });
      return q.promise;
    }
  }
})();
