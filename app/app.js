'use strict';

// Declare app level module which depends on views, and components
angular.module('crudContacts', [
  'ngRoute',
  'firebase',
  'crudContacts.contacts'
]).
config(['$routeProvider', function( $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
