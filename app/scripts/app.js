'use strict';

angular.module('jsHomeworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'jsHomeworkApp.services',
  'jsHomeworkApp.filters',
  'jsHomeworkApp.directives',
  'snap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });