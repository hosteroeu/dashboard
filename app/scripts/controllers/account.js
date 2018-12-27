'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('AccountCtrl', function($scope, accountsService, $mdDialog) {
    $scope.profile = JSON.parse(localStorage.getItem('profile'));
    $scope.account = JSON.parse(localStorage.getItem('account'));

    this.change_plan = function($event) {
      $mdDialog.show({
        controller: 'AccountPlansCtrl',
        controllerAs: 'accountPlansCtrl',
        templateUrl: 'views/account.plans.html',
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };
  });
