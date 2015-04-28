'use strict';

angular.module('sphinx', 
  [
  'ngAnimate', 
  'ngCookies', 
  'ngTouch', 
  'ngSanitize', 
  'ngResource', 
  'ui.router', 
  'ui.bootstrap',
  'angularSpinner',
  'rt.encodeuri',
  'ng-token-auth',
  'angular-flot',


  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('root', {
        abstract: true,


        views: {

          '@': {
            templateUrl: 'app/components/layout/base.html',
          },

          'header@root': {
            templateUrl: 'app/components/navbar/navbar.html',
            controller: 'NavbarCtrl'
          },

          'content@root': {
            template: ''
          }
        },

/*
        controller: function($state, $auth) {
          $auth.validateUser().then(function(user) {
            // if the user is authenticated, redirect to the dashboard
            $state.go('app.dashboard');
          });

          // otherwise proceed as normal
          $state.go('unauthed.login');
        }
        */
      })

      .state('index', {

        url: '/',

        controller: function($state) {
          $state.go('dashboard');
        }

      })


      .state('root.unauthenticated', {
        abstract: true,

        views: {
          'header': {
            templateUrl: 'app/components/navbar/simple_navbar.html',
          }
        },

        controller: 'AuthCtrl'
      })

      .state('login', {
        parent: 'root.unauthenticated',
        url: '/login',

        views: {
          'content@root': {
            templateUrl: 'app/auth/login.html'
          }
        }


      })

      .state('registration', {
        parent: 'root.unauthenticated',        
        url: '/register',
        views: {
          'content@root': {
            templateUrl: 'app/auth/register.html'
          }
        }
      })

      .state('password_reset', {
        parent: 'root.unauthenticated',        
        url: '/password_reset',
        views: {
          'content@root': {
            templateUrl: 'app/auth/password_reset.html'
          }
        }
      })



      .state('root.authenticated', {
        abstract: true,
        resolve: {
          authorize: function($auth, $state) {
            return $auth.validateUser().catch(function(){
              // redirect unauthorized users to the login page
              $state.go('login');
            });
          }
        }
      })

      .state('logout', {
        parent: 'root.authenticated',
        url: '/logout',
        templateUrl: 'app/auth/logout.html'
      })



      .state('dashboard', {
        parent: 'root.authenticated',
        url: '/dashboard',

        views: {
          'content@root': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      })


      .state('search', {
        parent: 'root.authenticated',
        url: '/search',

        views: {
          'content@root': {
            templateUrl: 'app/search/search.html',
          }
        }
      })

      .state('search.new', {
        url: '/new',
        controller: function($state, $stateParams) {

          var searchType = $stateParams.searchType;
          alert(searchType);

          var id = Math.random();

          $state.go('search.view', {id: id, searchType: searchType});

        },
        views: {
          'content@root': {
            templateUrl: 'app/search/search.html',
          }
        }
      })

      .state('search.view', {
        url: '/:id',
        views: {
          'content@root': {
            templateUrl: 'app/search/search.html',
          }
        }
      })


      ;

    $urlRouterProvider.otherwise('/');
  })
  .config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:3000/api/v2/',
      emailSignInPath: 'auth/sign_in', 

      storage: 'cookie',     
    });
  })  


;
