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

      switch (_account.plan_hosts) {
        case 1:
          $scope.plan = 'Free (1 Miner)';
          break;
        case 5:
          $scope.plan = 'Hobby (5 Miners)';
          break;
        case 20:
          $scope.plan = 'Miner (20 Miners)';
          break;
        case 100:
          $scope.plan = 'Farm (100 Miners)';
          break;
        case -1:
          $scope.plan = 'Unlimited Miners';
          break;
        default:
          $scope.plan = 'Custom (' + _account.plan_hosts + ' Miners)';
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
