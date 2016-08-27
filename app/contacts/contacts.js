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

    $scope.hideAddForm = function() {
      $scope.addFormShow = false;
    }

    $scope.addContactSubmit = function() {
      var name = $scope.name || null;
      var email = $scope.email || null;
      var company = $scope.company || null;
      var mobile_phone = $scope.mobile_phone || null;
      var work_phone = $scope.work_phone || null;
      var home_phone = $scope.home_phone || null;
      var street_address = $scope.street_address || null;
      var city = $scope.city || null;
      var state = $scope.state || null;
      var zipcode = $scope.zipcode || null;

      vm.contacts.$add({
        name: name,
        email: email,
        company: company,
        phones: [
          {
            mobile: mobile_phone,
            work: work_phone,
            home: home_phone
          }
        ],
        address: [
          {
            street_address: street_address,
            city: city,
            state: state,
            zipcode: zipcode
          }
        ]
      }).then(function(ref) {
        $scope.newContactForm.$setUntouched();
        $scope.newContactForm.$setPristine();

        $scope.addFormShow = false;
        vm.msg = "Your contact was added.";
      })
    }
  }]);
