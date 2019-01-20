'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, hostsService, minersService, coinsService, accountsService, logsService) {
    $scope.total_power = 0;
    $scope.profile = JSON.parse(localStorage.getItem('profile')) || {};
    $scope.global_account = JSON.parse(localStorage.getItem('account')) || {};
    $scope.global_hosts = hostsService.query();
    $scope.global_coins = coinsService.query({
      on_hostero: 1
    });
    $scope.global_logs = logsService.query();

    minersService.query().$promise.then(function(res) {
      $scope.global_miners = res;

      res.forEach(function(miner) {
        $scope.total_power += parseInt(miner.power) || 0;
      });
    });
  });
