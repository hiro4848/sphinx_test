'use strict';

angular.module('sphinx')
  .controller('SearchCtrl', function ($scope, SavedSearch) {



  })

  .controller('AdvSearchCtrl', function() {

  })


  .controller('TabbedSearchCtrl', function($attrs, $scope, $http, $state, $stateParams, usSpinnerService, SavedSearch) {
    // models
    $scope.saved_searches = SavedSearch.query();


    $scope.SEARCH_TYPE_UNDEFINED = 0;
    $scope.SEARCH_TYPE_PROCESSES = 1;
    $scope.SEARCH_TYPE_EVENTS = 2;


    $scope.tabClicked = function(saved_search) {

    };


    $scope.newSearchTabClicked = function() {



      var new_search = createNewSearch();
      $scope.saved_searches.push(new_search);

      set_active_tab(new_search);

//      $state.go('search.new', {searchType: })
    };



    function createNewSearch() {

      var new_tab_num = $scope.saved_searches.length + 1;

      var new_tab = {
        is_active: true,
        search_type: $scope.SEARCH_TYPE_UNDEFINED,
        name: 'my search ' + new_tab_num,
        dropdown_status: false
      };

      return new_tab;
    }

    $scope.toggleDropdown = function($event, saved_search) {
      //      $event.preventDefault();
      $event.stopPropagation();

      if (saved_search.dropdown_status)
        saved_search.dropdown_status = !saved_search.dropdown_status;
      else
        saved_search.dropdown_status = true;

    };

    $scope.stop_propagation = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

    };

    $scope.refresh_search_tab = function(saved_search) {
      $scope.$broadcast('refresh_search', saved_search.id);
    }



    $scope.tab_clicked = function(saved_search) {

      $scope.refresh_search_tab(saved_search);
      $scope.update_active_saved_search(saved_search);

    };

    $scope.update_active_saved_search = function(saved_search) {

      var url = "/api/v1/user/update_active_saved_search";
      var post_data = {saved_search_id: saved_search.id};

      $http.post(url, post_data).
      success(function(data, status, headers, config) {

      });
    };


    $scope.get_active_tab = function() {
      for (var i = 0; i < $scope.saved_searches; i++) {
        var curr_tab = $scope.saved_searches[i];
        if (curr_tab.is_active)
          return curr_tab;
      }

      return null;
    };

    $scope.rename_tab = function(saved_search) {

      var put_data = {
        saved_search: {
          name: saved_search.name
        }
      };

      // update database
      var url = "/api/v1/user/saved_searches/" + saved_search.id;
      $http.put(url, put_data).
      success(function(data, status, headers, config) {

      });

    };

    $scope.update_tab = function(saved_search) {

      var put_data = {
        saved_search: saved_search
      };

      // update database
      var url = "/api/v1/user/saved_searches/" + saved_search.id;
      $http.put(url, put_data).
      success(function(data, status, headers, config) {

      });


    };

    function set_active_tab(tab) {
      for (var i = 0; i < $scope.saved_searches.length; i++) {
        var curr_tab = $scope.saved_searches[i];
        curr_tab.is_active = (curr_tab == tab) ? true : false;
      }
    }

    $scope.new_search_tab_clicked = function() {

      var new_search = create_new_search();
      $scope.saved_searches.push(new_search);

      set_active_tab(new_search);
    };

    $scope.remove_tab = function(index) {

      var saved_search = $scope.saved_searches[index];
      $scope.saved_searches.splice(index, 1);

      // update database
      var url = "/api/v1/user/saved_searches/" + saved_search.id;
      $http.delete(url).
      success(function(data, status, headers, config) {

      });
    };


    $scope.start_process_search = function(new_search) {
      new_search.search_type = $scope.SEARCH_TYPE_PROCESSES;

      set_active_tab(new_search);

    };

    $scope.start_event_search = function(new_search) {
      new_search.search_type = $scope.SEARCH_TYPE_EVENTS;

      set_active_tab(new_search);
    };


    $scope.load_saved_search_tabs = function(set_active_tab_flag) {
      var url = "/api/v1/user/saved_searches";
      $http.get(url).
      success(function(data, status, headers, config) {
        if (data.length == 0) 
        {
          $scope.saved_searches = [create_new_search()];
        } 
        else 
        {
          for(var i = 0; i < $scope.saved_searches.length; i++)
          {
            data.push($scope.saved_searches[i]);
          }
          $scope.saved_searches = data;
        }

        // set the most recent tab as an active one
        if (set_active_tab_flag)
        {          
          var most_recent_search = $scope.saved_searches[$scope.saved_searches.length - 1];
          set_active_tab(most_recent_search);
        }


      });
    }


    $scope.init = function() {



      // account for /search/new
      var pathname_arr = window.location.pathname.split('/');
      if (pathname_arr[pathname_arr.length - 1] == 'new')
      {
        var query = getParameterByName('q');
        var type = getParameterByName('type');

        if (type == 'process')
        {
          var new_search = create_new_search();
          var criteria = {criteria_simple_text: query};
          new_search.criteria = criteria;
          $scope.start_process_search(new_search);
          $scope.saved_searches.push(new_search);
        }
        else if (type == 'event')
        {
          var new_search = create_new_search();
          var criteria = {criteria_simple_text: query};
          new_search.criteria = criteria;
          $scope.start_event_search(new_search);
          $scope.saved_searches.push(new_search);
        }
        else
        {
          $scope.new_search_tab_clicked();          
        }

        // clear params
        history.pushState(null, null, '/sb_admin/search');

        // load saved search tabs
        $scope.load_saved_search_tabs(false);
      }
      else
      {
        // load saved search tabs
        $scope.load_saved_search_tabs(true);
      }



    }



  })



;
