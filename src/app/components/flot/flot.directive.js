'use strict';


angular.module('angular-flot', ['jquery.flot.time', 'jquery.flot.resize', 'jquery.flot.selection']).directive('flot', function() {
  return {
    restrict: 'EA',
    template: '<div></div>',
    scope: {
      dataset: '=',
      min: '=',
      max: '=',
      options: '=',
      callback: '=',
      selectioncallback: '='
    },
    link: function(scope, element, attributes) {
      var height, init, onDatasetChanged, onOptionsChanged, plot, plotArea, width;
      var onMinChanged, onMaxChanged;
      plot = null;
      width = attributes.width || '100%';
      height = attributes.height || '100%';
      if (!scope.dataset) {
        scope.dataset = [];
      }
      if (!scope.options) {
        scope.options = {
          legend: {
            show: false
          }
        };
      }
      plotArea = $(element.children()[0]);
      plotArea.css({
        width: width,
        height: height
      });

      plotArea.bind("plotselected", function(event, ranges) {

        if (scope.selectioncallback) {
          scope.selectioncallback(event, ranges);
        }
        /*
        $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

        var zoom = $("#zoom").prop("checked");

        if (zoom) {
          $.each(plot.getXAxes(), function(_, axis) {
            var opts = axis.options;
            opts.min = ranges.xaxis.from;
            opts.max = ranges.xaxis.to;
          });
          plot.setupGrid();
          plot.draw();
          plot.clearSelection();
        }
        */
      });

      init = function() {
        var plotObj;
        plotObj = $.plot(plotArea, scope.dataset, scope.options);
        if (scope.callback) {
          scope.callback(plotObj);
        }
        return plotObj;
      };
      onDatasetChanged = function(dataset) {
        if (plot) {
          plot.clearSelection();
          plot.setData(dataset);
          plot.setupGrid();
          return plot.draw();
        } else {
          return plot = init();
        }
      };
      scope.$watch('dataset', onDatasetChanged, true);
      onMinChanged = function(min) {
        if (plot) {
          plot.clearSelection();
          plot.getOptions().xaxes[0].min = min;
          plot.setupGrid();
          return plot.draw();
        }
      };
      onMaxChanged = function(max) {
        if (plot) {
          plot.clearSelection();
          plot.getOptions().xaxes[0].max = max;
          plot.setupGrid();
          return plot.draw();
        }
      };
      scope.$watch('min', onMinChanged, true);
      scope.$watch('max', onMaxChanged, true);
      onOptionsChanged = function() {
        return plot = init();
      };
      return scope.$watch('options', onOptionsChanged, true);
    }
  };
});


