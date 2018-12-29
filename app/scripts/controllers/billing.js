'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:BillingCtrl
 * @description
 * # BillingCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('BillingCtrl', function($scope, accountsService, paymentsService, $mdDialog) {
    var account = JSON.parse(localStorage.getItem('account'));

    $scope.payments = paymentsService.query();

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      $scope.account = _account;

      switch (_account.plan_miners) {
        case 1:
          $scope.plan = 'free';
          break;
        case 5:
          $scope.plan = 'hobby';
          break;
        case 20:
          $scope.plan = 'miner';
          break;
        case 100:
          $scope.plan = 'farm';
          break;
        case -1:
          $scope.plan = 'unlimited';
          break;
        default:
          $scope.plan = 'custom';
      }
    });

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
