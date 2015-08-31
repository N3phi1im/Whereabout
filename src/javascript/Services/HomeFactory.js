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
    o.sendLike = sendLike;
    o.getLikes = getLikes;
    o.postBase64 = postBase64;
    return o;

    //POST BASE64 IMG TO CLOUDINARY
    function postBase64(media) {
      var q = $q.defer();
      $http.post('/api/Photos/base64', {data:media}, {"Content-type": "image/jpeg"})
      .success(function(data){
        q.resolve(data);
      })
      .error(function(data){
      });
      return q.promise;
    }
    
    //ADD LIKE TO DATABASE 'LIKES' ARRAY BY PHOTO ID
    function sendLike(id) {
      var q = $q.defer();
      $http.post('/api/Photos/like/'+id, {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res){
        q.resolve(res);
      });
      return q.promise;
    }

    //GET 'LIKES' ARRAY FROM DATABASE BY PHOTO ID
    function getLikes(id) {
      var q = $q.defer();
      $http.get('/api/Photos/getlikes/'+id).success(function(res){
        q.resolve(res);
      });
      return q.promise;
    }

    //FOLLOW BUSINESS BY BUSINESS ID
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

    //UPLOAD PHOTO TO DATABASE AND CLOUDINARY
    function upload(photo) {
      var q = $q.defer();
      $http.post('/api/Photos/upload', photo).success(function(req, res) {
        q.resolve(res);
      });
      return q.promise;
    }

    //UPLOAD LOCATION OF BUSINESS
    function uploadLocation(location) {
      var q = $q.defer();
      $http.post('/api/Places/Place', location).success(function(req, res) {
        q.resolve();

      });
      return q.promise;
    }

    //GIVE PHOTO PROPERTIES BY PHOTO ID
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

    //ATTACH PHOTO BY IT'S ID TO PLACE BY IT'S ID
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

    //GET BUSINESS DATA
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

    //CREATE BUSINESS IN DATABASE
    function makeBusiness(resPlace) {
      var q = $q.defer();
      $http.post('/api/Places/Place', resPlace).success(function(res, req, id) {
        $http.get('/api/Places/place/info/' + resPlace.id).success(function(data) {
          q.resolve(data);
        });
      });
      return q.promise;
    }


    //UNFOLLOW BUSINESS
    function removeFollow(id) {
      var q = $q.defer();
      $http.post('/api/Places/unfollow/' + id, {}, {
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
