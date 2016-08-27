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

    $scope.hide = function() {
      $scope.addFormShowFlag = false;
      $scope.contactShowFlag = false;
      $scope.editFormShowFlag = false;
    }

    $scope.anyPopUps = function() {
      return $scope.addFormShowFlag || $scope.contactShowFlag || $scope.editFormShowFlag;
    }

// Add Contact Functioniality
    $scope.showAddForm = function() {
      $scope.addFormShowFlag = true;
    }

    $scope.addContactSubmit = function() {
      var name           = $scope.name || null;
      var email          = $scope.email || null;
      var company        = $scope.company || null;
      var mobile_phone   = $scope.mobile_phone || null;
      var work_phone     = $scope.work_phone || null;
      var home_phone     = $scope.home_phone || null;
      var street_address = $scope.street_address || null;
      var city           = $scope.city || null;
      var state          = $scope.state || null;
      var zipcode        = $scope.zipcode || null;

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

        $scope.addFormShowFlag = false;
        vm.msg = "Your contact was added.";
      })
    }

// Edit Contact
    $scope.showEditForm = function(contact) {
      $scope.editFormShowFlag = true;

      $scope.id             = contact.$id
      $scope.name           = contact.name;
      $scope.company        = contact.company;
      $scope.email          = contact.email;
      $scope.mobile_phone   = contact.phones[0].mobile || null;
      $scope.work_phone     = contact.phones[0].work || null;
      $scope.home_phone     = contact.phones[0].home || null;
      $scope.street_address = contact.address[0].street_address || null;
      $scope.city           = contact.address[0].city || null;
      $scope.state          = contact.address[0].state || null;
      $scope.zipcode        = contact.address[0].zipcode || null;
    }

    $scope.editContactSubmit = function() {

      var id = $scope.id
      var record = vm.contacts.$getRecord(id);

      record.name                      = $scope.name;
      record.email                     = $scope.email;
      record.company                   = $scope.company;
      record.phones[0].mobile          = $scope.mobile_phone;
      record.phones[0].work            = $scope.work_phone;
      record.phones[0].home            = $scope.home_phone;
      record.address[0].street_address = $scope.street_address;
      record.address[0].city           = $scope.city;
      record.address[0].state          = $scope.state;
      record.address[0].zipcode        = $scope.zipcode;

      vm.contacts.$save(record)
        .then(function(){
          $scope.editContactForm.$setUntouched();
          $scope.editContactForm.$setPristine();

          $scope.hide();
          vm.msg = "Contact Updated";
        })

    }

// Remove Contact

    $scope.removeContact = function(contact) {
      vm.contacts.$remove(contact);
      $scope.msg = "Contact Removed";
    }

// Show Contact Functionality

    $scope.showContact = function(contact) {
      $scope.contactShowFlag = true;

      $scope.name           = contact.name;
      $scope.company        = contact.company;
      $scope.email          = contact.email;
      $scope.mobile_phone   = contact.phones[0].mobile || null;
      $scope.work_phone     = contact.phones[0].work || null;
      $scope.home_phone     = contact.phones[0].home || null;
      $scope.street_address = contact.address[0].street_address || null;
      $scope.city           = contact.address[0].city || null;
      $scope.state          = contact.address[0].state || null;
      $scope.zipcode        = contact.address[0].zipcode || null;
    }
  }]);
