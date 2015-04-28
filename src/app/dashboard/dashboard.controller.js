'use strict';

angular.module('sphinx')
  .controller('DashboardCtrl', function($scope) {


  })


  .controller('QuickSearchCtrl', ['$attrs', '$scope', '$http', '$location', function($attrs, $scope, $http, $location) {

  $scope.search_text = '';


  $scope.search = function(search_type) {

    var new_path = '/sb_admin/search/new?';

    if (search_type == 'search' || search_type == null) {
      new_path += 'type=process';
      new_path += '&q=' + encodeURI($scope.search_text);
    } else {
      new_path += 'type=event';
      new_path += '&q=' + encodeURI($scope.search_text);
    }

    window.location.href = new_path;
  };



  $scope.init = function() {


  };



}])



;