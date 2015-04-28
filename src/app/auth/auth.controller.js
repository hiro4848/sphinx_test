'use strict';

angular.module('sphinx')
  .controller('AuthCtrl', function ($scope, $auth, $state) {



    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
      .then(function(resp) { 
          // handle success response
          $state.go('index');
        })
      .catch(function(resp) { 
          // handle error response
          alert(resp.reason);
        });
    };


    $scope.handleLoginBtnClick = function() {

      $auth.submitLogin($scope.loginForm)
        .then(function(resp) { 
          // handle success response

          $state.go('index');

        })
        .catch(function(resp) { 
          // handle error response
          alert(resp.reason);

        });
    };


    $scope.signOutBtnClicked = function() {

      $auth.signOut();
      $state.go('index');

    };


    $scope.handlePwdResetBtnClicked = function() {
      $auth.requestPasswordReset($scope.pwdResetForm)
        .then(function(resp) { 
          $state.go('login');
          // handle success response
        })
        .catch(function(resp) { 
          // handle error response
        });
    };


  })


;
