

'use strict';

angular.module('sphinx')

  .controller('FlotCtrl', function($scope) {
    
  $scope.dataset = [{
    data: [],
    xaxis: {
      mode: "time"
    },
    label: "sin"
  }];
  $scope.options = {
    series: {
      bars: {
        show: true,
        barWidth: 0.6,
        align: "center"
      }
    },
    legend: {
      noColumns: 2
    },
    xaxis: {
      mode: "time",
      timezone: "browser"
    },
    yaxis: {
      min: 0,
      tickDecimals: 0
    },
    selection: {
      mode: "x"
    }
  };

  $scope.selectioncallback = function(evt, ranges) {

    //    $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

    //    $scope.$parent.search_from = Math.floor(ranges.xaxis.from);
    //    $scope.$parent.search_to = Math.floor(ranges.xaxis.to);

    var from = Math.floor(ranges.xaxis.from);
    var to = Math.floor(ranges.xaxis.to);
    var interval_type = 'fixed';

    $scope.$parent.update_criteria_time(from, to, interval_type, null);
    $scope.$parent.search();
  };

  $scope.min = 1;



  for (var i = 0; i < 14; i += 0.5) {
    //    $scope.dataset[0].data.push([i, Math.sin(i)]);
  }


//  $scope.$on('change:flot_data', function(event, data) {

  $scope.$parent.$watch('event_histogram_data', function(new_event_histogram_data, old_event_histogram_data) {


    if (new_event_histogram_data == null)
    {
      return;
    }

    var data = new_event_histogram_data;

    xaxis = {
      mode: "time",
      minTickSize: [1, "minute"],
      min: (new Date(data[0][0])).getTime(), // - min_max_margin,
      max: (new Date(data[data.length - 1][0])).getTime() // + min_max_margin

      //      timeformat: "%a"
    };
    yaxis = {
      tickDecimals: 0,
    };

    colors = ["#d18b2c", "#dba255", "#919733"];

    bars = {
      //      order:1, 
      show: 1,
      fill: true,
      //      borderWidth: 0,
      shadowSize: 0,
      fillColor: {
        colors: [{
          opacity: 0.5
        }, {
          opacity: 0.5
        }]
      },
      barWidth: ((xaxis.max - xaxis.min) / (data.length * 2))
    };
    grid = {
      backgroundColor: '#FFFFFF',
      hoverable: true,
      axisMargin: 100,
    };

    $scope.dataset = [{
      color: "#9f3",
      grid: grid,
      data: data,
      bars: bars,
      colors: colors,
      xaxis: xaxis,
      yaxis: yaxis,
      label: "proc"
    }];


  });




});

