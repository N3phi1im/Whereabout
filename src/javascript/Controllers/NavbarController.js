(function() {
  'use strict';
  angular.module('app')
  .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['HomeFactory','$http','$modal', 'UserFactory', '$state', '$scope', '$anchorScroll', '$location'];

  function NavbarController(HomeFactory, $http, $modal, UserFactory, $state, scope, $anchorScroll, $location) {
    var vm = this;
    vm.user = {};
    vm.status = UserFactory.status;
    vm.register = register;
    vm.login = login;
    vm.logout = logout;
    vm.resetPass = resetPass;
    vm.update = update;
    vm.goPage = goPage;


    function register() {
      var u = vm.user;
      if (!u.email || !u.password || !u.cpassword || (u.password !== u.cpassword)) {
        return false;
      }
      UserFactory.register(u).then(function() {
        $state.go('Home');
      });
    }

    function update() {
      var u = vm.user;
      UserFactory.update(u).then(function() {
        $state.go('Home');
       toastr.success('Your profile changes were successful!');


      });
    }

    function login() {
      UserFactory.login(vm.user).then(function() {
        $state.go('Home');
      });
    }

    function logout() {
      UserFactory.logout();
      $state.go('Welcome');
    }

    function resetPass(email) {
      var request = {};
      UserFactory.checkEmail(email).then(function(res1) {
        UserFactory.generate(res1).then(function(res2) {
          if (res2 === undefined) {
            alert('No Account exists with that Email.');
          } else {
            request.email = email;
            request.id = res1;
            request.guid = res2;
            UserFactory.resetPass(request).then(function(res3) {});
          }
        });
      });
    }
    function goPage(search) {
      $state.go('CategoryResults', {search: search});
    }

    vm.scrollTo = function(id) {
      $location.hash(id);
      console.log($location.hash());
      $anchorScroll();
    };


    var dropbox = document.getElementById("dropbox");
    scope.dropText = 'Drop files here...';

    // init event handlers
    function dragEnterLeave(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      scope.$apply(function(){
        scope.dropText = 'Drop files here...';
        scope.dropClass = '';
      });
    }
    // dropbox.addEventListener("dragenter", dragEnterLeave, false);
    // dropbox.addEventListener("dragleave", dragEnterLeave, false);
    // dropbox.addEventListener("dragover", function(evt) {
    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   var clazz = 'not-available';
    //   var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
    //   scope.$apply(function(){
    //     scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
    //     scope.dropClass = ok ? 'over' : 'not-available';
    //   });
//     // }, false);
// dropbox.addEventListener("drop", function(evt) {
//   console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)));
//   evt.stopPropagation();
//   evt.preventDefault();
//   scope.$apply(function(){
//     scope.dropText = 'Drop files here...';
//     scope.dropClass = '';
//   });
//   var files = evt.dataTransfer.files;
//   if (files.length > 0) {
//     scope.$apply(function(){
//       scope.files = [];
//       for (var i = 0; i < files.length; i++) {
//         scope.files.push(files[i]);
//       }
//     });
//   }
// }, false);
    //============== DRAG & DROP =============

    vm.capture = function(media) {
      HomeFactory.postBase64(media).then(function(res){
        console.log(res);
      });
    };
    

    scope.setFiles = function(element) {
     scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
      scope.files = [];
      for (var i = 0; i < element.files.length; i++) {
        scope.files.push(element.files[i]);
      }
      scope.progressVisible = false;
    });
   };

   scope.uploadFile = function(user) {
    var fd = new FormData();
    for (var i in scope.files) {
      fd.append("uploadedFile", scope.files[i]);
    }
      // var xhr = new XMLHttpRequest();
      // xhr.upload.addEventListener("progress", uploadProgress, false);
      // xhr.addEventListener("load", uploadComplete, false);
      // xhr.addEventListener("error", uploadFailed, false);
      // xhr.addEventListener("abort", uploadCanceled, false);
      // xhr.open("POST", "/api/Photos/upload");
      // xhr.onload = function(res) {
      //  HomeFactory.setPhoto(res);
      // };
      // scope.progressVisible = true;
      // xhr.send(fd);
      $http.post('/api/Photos/profilephoto', fd, 
      { transformRequest: angular.identity, headers: {'Content-Type': undefined}}).success(function(data){
      UserFactory.updatePhoto(data).then(function(res){
       toastr.info('Please log out and log back in to see changes');
      });
        })
        .error(function(data){
        });
      };

      function uploadProgress(evt) {
       scope.$apply(function(){
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
       scope.$apply(function(){
        scope.progressVisible = false;
      });
       console.log("The upload has been canceled by the user or the browser dropped the connection.");
     }

   }
 })();
