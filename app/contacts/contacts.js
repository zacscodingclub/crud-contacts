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
    var vm = this;
    var ref = firebase.database().ref();
    vm.contacts = $firebaseArray(ref);

    $scope.showAddForm = function() {
      $scope.addFormShow = true;
    }
  }]);
