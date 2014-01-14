'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('jsHomeworkApp.services', ['ngResource']).
  factory('AwsAPI', ['$resource', function($resource) {
    return $resource('/api/:action', {}, {
      search: {method:'GET', params:{action: 'search'}, isArray:true}
    });
  }]);