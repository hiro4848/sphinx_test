'use strict';




angular.module('sphinx')
  .factory('SavedSearch', function ($resource) {

    var apiEndpoint = 'http://localhost:3000/api/v2/';

    return $resource(apiEndpoint + 'saved_searches/:id', { id: '@_id' }, {
      update: {
        method: 'PUT' 
      }
    });


  });

