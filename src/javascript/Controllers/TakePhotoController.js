(function() {
  'use strict';
  angular.module('app')
    .controller('TakePhotoController', TakePhotoController);
  TakePhotoController.$inject = ['$state', '$http', '$q', 'HomeFactory', '$scope'];

  function TakePhotoController($state, $http, $q, HomeFactory, scope) {
    var vm = this; // vm is photoctrl on takephotopage
    vm.selectedLocation = {};
    vm.title = {};


    var dropbox = document.getElementById("dropbox");
    scope.dropText = 'Drop files here...';

    // init event handlers
    function dragEnterLeave(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      scope.$apply(function() {
        scope.dropText = 'Drop files here...';
        scope.dropClass = '';
      });
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false);
    dropbox.addEventListener("dragleave", dragEnterLeave, false);
    dropbox.addEventListener("dragover", function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var clazz = 'not-available';
      var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
      scope.$apply(function() {
        scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
        scope.dropClass = ok ? 'over' : 'not-available';
      });
    }, false);
    dropbox.addEventListener("drop", function(evt) {
      console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)));
      evt.stopPropagation();
      evt.preventDefault();
      scope.$apply(function() {
        scope.dropText = 'Drop files here...';
        scope.dropClass = '';
      });
      var files = evt.dataTransfer.files;
      if (files.length > 0) {
        scope.$apply(function() {
          scope.files = [];
          for (var i = 0; i < files.length; i++) {
            scope.files.push(files[i]);
          }
        });
      }
    }, false);
    //============== DRAG & DROP =============

    vm.capture = function(media) {
      HomeFactory.postBase64(media).then(function(data) {
        HomeFactory.uploadLocation(vm.selectedLocation).then(function() {
          data.title = vm.title;
          HomeFactory.setPhoto(data).then(function(res) {
            HomeFactory.combinePhotoPlace(res, vm.selectedLocation).then(function() {
              $state.go('Home');
              toastr.success('Your photo was added!');
            });
          });
        });
      });
    };


    scope.setFiles = function(element) {
      scope.$apply(function(scope) {
        // console.log('files:', element.files);
        // Turn the FileList object into an Array
        scope.files = [];
        for (var i = 0; i < element.files.length; i++) {
          scope.files.push(element.files[i]);
        }
        scope.progressVisible = false;
      });
    };

    scope.uploadFile = function() {
      var fd = new FormData();
      for (var i in scope.files) {
        fd.append("uploadedFile", scope.files[i]);
      }
      $http.post('/api/Photos/upload', fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .success(function(data) {
          HomeFactory.uploadLocation(vm.selectedLocation).then(function() {
            data.title = vm.title;
            HomeFactory.setPhoto(data).then(function(res) {
              HomeFactory.combinePhotoPlace(res, vm.selectedLocation).then(function() {
                $state.go('Home');
                toastr.success('Your photo was added!');
              });
            });
          });
        })
        .error(function(data) {});
    };

    function uploadProgress(evt) {
      scope.$apply(function() {
        if (evt.lengthComputable) {
          scope.progress = Math.round(evt.loaded * 100 / evt.total);
        } else {
          scope.progress = 'unable to compute';
        }
      });
    }

    function uploadComplete(evt) {
      /* This event is raised when the server send back a response */
      console.log(evt.target.responseText);
    }

    function uploadFailed(evt) {
      console.log("There was an error attempting to upload the file.");
    }

    function uploadCanceled(evt) {
      scope.$apply(function() {
        scope.progressVisible = false;
      });
      console.log("The upload has been canceled by the user or the browser dropped the connection.");
    }
  }
})();
