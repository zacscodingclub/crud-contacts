'use strict';

// Declare app level module which depends on views, and components
angular.module('crudContacts', [
  'ngRoute'
]).
config(['$routeProvider', function( $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
