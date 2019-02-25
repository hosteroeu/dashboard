'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, $rootScope, $state, hostsService, minersService, coinsService, accountsService, logsService) {
    var token = localStorage.getItem('token');

    $scope.isAuthenticated = false;
    $rootScope.minimalLayout = false;
    $scope.global_state = $state;

    // TODO: Don't make API calls from the root scope, it's not cool, use
    // another controller

    if (token) {
      $scope.isAuthenticated = true;
      $scope.total_power = 0;
      $scope.profile = JSON.parse(localStorage.getItem('profile')) || {};
      $scope.global_account = JSON.parse(localStorage.getItem('account')) || {};

      if ($rootScope.minimalLayout === false) {
        $scope.global_hosts = hostsService.query();
        $scope.global_coins = coinsService.query({
          on_hostero: 1
        });
        $scope.global_logs = logsService.query();

        minersService.query().$promise.then(function(res) {
          $scope.global_miners = [];

          res.forEach(function(miner) {
            if (!miner.temporary) {
              $scope.global_miners.push(miner);
              $scope.total_power += parseInt(miner.power) || 0;
            }
          });
        });
      }
    }
  });
