'use strict';

angular.module('sphinx')
  .controller('TimePickerCtrl', ['$attrs', '$scope', '$http', 'usSpinnerService', function($attrs, $scope, $http, usSpinnerService) {

  $scope.date_picker_format = "dd-MMMM-yyyy";
  $scope.date_picker_from = null;
  $scope.date_picker_to = null;
  $scope.date_picker_opened_from = {
    'opened': false
  };
  $scope.date_picker_opened_to = {
    'opened': false
  };
  $scope.date_picker_options = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.from = '';
  $scope.to = '';



  $scope.time_range_str = function() {

    return $scope.date_picker_from;

  };

  $scope.date_picker_from_clicked = function(date) {

    $scope.from = date;
    $scope.$parent.update_criteria_time($scope.from, $scope.to, 'fixed', null);
  }

  $scope.date_picker_to_clicked = function(date) {

    $scope.to = date;
    $scope.$parent.update_criteria_time($scope.from, $scope.to, 'fixed', null);
  }

  $scope.date_picker_apply_clicked = function() {
    $scope.$parent.search();
  }

  $scope.date_picker_open_from = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    // NOTE: datepicker originally didn't re-open the picker after opening it the first time.
    // Read juanpablopola's post from 3/6 https://github.com/angular-ui/bootstrap/issues/2540
    $scope.date_picker_opened_from = {
      'opened': true
    };
  };

  $scope.date_picker_open_to = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.date_picker_opened_to = {
      'opened': true
    };
  };





  //TODO this code is shamelessly stolen from kibana (3/18/15)
  var quick_ranges =
    [{
        from: 'now/d',
        to: 'now/d',
        display: 'Today',
        section: 0
      }, {
        from: 'now/w',
        to: 'now/w',
        display: 'This week',
        section: 0
      }, {
        from: 'now/M',
        to: 'now/M',
        display: 'This month',
        section: 0
      }, {
        from: 'now/y',
        to: 'now/y',
        display: 'This year',
        section: 0
      }, {
        from: 'now/d',
        to: 'now',
        display: 'The day so far',
        section: 0
      }, {
        from: 'now/w',
        to: 'now',
        display: 'Week to date',
        section: 0
      }, {
        from: 'now/M',
        to: 'now',
        display: 'Month to date',
        section: 0
      }, {
        from: 'now/y',
        to: 'now',
        display: 'Year to date',
        section: 0
      },

      {
        from: 'now-1d/d',
        to: 'now-1d/d',
        display: 'Yesterday',
        section: 1
      }, {
        from: 'now-2d/d',
        to: 'now-2d/d',
        display: 'Day before yesterday',
        section: 1
      }, {
        from: 'now-7d/d',
        to: 'now-7d/d',
        display: 'This day last week',
        section: 1
      }, {
        from: 'now-1w/w',
        to: 'now-1w/w',
        display: 'Last week',
        section: 1
      }, {
        from: 'now-1M/M',
        to: 'now-1M/M',
        display: 'Last month',
        section: 1
      }, {
        from: 'now-1y/y',
        to: 'now-1y/y',
        display: 'Last year',
        section: 1
      },

      {
        from: 'now-15m',
        to: 'now',
        display: 'Last 15 minutes',
        section: 2
      }, {
        from: 'now-30m',
        to: 'now',
        display: 'Last 30 minutes',
        section: 2
      }, {
        from: 'now-1h',
        to: 'now',
        display: 'Last 1 hour',
        section: 2
      }, {
        from: 'now-4h',
        to: 'now',
        display: 'Last 4 hours',
        section: 2
      }, {
        from: 'now-12h',
        to: 'now',
        display: 'Last 12 hours',
        section: 2
      }, {
        from: 'now-24h',
        to: 'now',
        display: 'Last 24 hours',
        section: 2
      }, {
        from: 'now-7d',
        to: 'now',
        display: 'Last 7 days',
        section: 2
      }, {
        from: 'now-30d',
        to: 'now',
        display: 'Last 30 days',
        section: 2
      },
    ];
  $scope.quickLists = _(quick_ranges).groupBy('section').values().value();



  $scope.quick_list_item_clicked = function(from, to, display) {

    $scope.from = from;
    $scope.to = to;
    $scope.$parent.update_criteria_time($scope.from, $scope.to, 'auto', display);

    // search
    $scope.$parent.search();
  };




}]);
