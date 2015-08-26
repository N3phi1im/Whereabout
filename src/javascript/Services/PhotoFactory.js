(function() {
  'use strict';
  angular.module('app')
    .factory('PhotoFactory', PhotoFactory);

  PhotoFactory.$inject = ['HomeFactory', 'Map', 'UserFactory', '$http', '$q'];

  function PhotoFactory(HomeFactory, Map, UserFactory, $http, $q) {
    var o = {};
    o.populateHome = populateHome;
    return o;

    function populateHome() {
      var q = $q.defer();
      $http.get('/api/Places/populate', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }).success(function(res) {
        console.log('factory');
        q.resolve();
      });
      return q.promise;
    }

  }
})();
