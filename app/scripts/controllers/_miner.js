'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinerCtrl
 * @description
 * # MinerCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinerCtrl', function($scope, $state, $mdDialog, minersService) {
    $scope.miner = null;
    $scope.show_chart = false;

    minersService.get({
      id: $state.params.miner
    }).$promise.then(function(res) {
      $scope.miner = res;
      $scope.miner.wallet = JSON.parse($scope.miner.wallet);

      if ($scope.miner.mining_pool_url.indexOf('WMP') !== -1) {
        $scope.show_chart = true;
      }
    });

    $scope.getIframeSrc = function(panelId, address) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/wmp-miner-hash?orgId=1&from=1535989000082&to=1536075400084&panelId=' + panelId + '&theme=light&var-address=' + encodeURIComponent(address);
    };

    $scope.getHref = function(address) {
      return 'https://www.webdscan.io/address/' + encodeURIComponent(address);
    };
  });
