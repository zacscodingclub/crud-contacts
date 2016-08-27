'use strict';

angular
  .module('crudContacts.contacts', ['ngRoute', 'firebase'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
      templateUrl: 'contacts/contacts.html',
      controller: 'ContactsController'
    })
  }])

  .controller('ContactsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref = new Firebase('https://crud-contacts.firebaseio.com/contacts');

    $scope.contacts = $firebaseArray(ref);
    console.log($scope.contacts);
  }]);
