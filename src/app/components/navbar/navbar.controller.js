'use strict';

angular.module('sphinx')
  .controller('NavbarCtrl', function ($scope, $auth, $state) {

    $scope.signOutBtnClicked = function() {

      $auth.signOut()
      .then(function(resp) { 
        // handle success response
        $state.go('index');          
      })
      .catch(function(resp) { 
        $state.go('index');
      });



    };




  });
