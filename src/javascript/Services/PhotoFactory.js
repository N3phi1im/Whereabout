(function() {
  'use strict';
  angular.module('app')
    .factory('PhotoFactory', PhotoFactory);

  PhotoFactory.$inject = ['Map', 'UserFactory', '$http', '$q'];

  function PhotoFactory(Map, UserFactory, $http, $q) {
    var o = {};
    
    return o;


  }
})();
