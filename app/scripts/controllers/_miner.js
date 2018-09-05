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

      switch ($scope.miner.mining_pool_url) {
        case 'https://mine.webdollarminingpool.com/pool/1/WMP/0.02/bdda9527a040d9063e22e1dccc4d860b84227ff73232f5c418054112114a6ea4/https:$$pool.webdollarminingpool.com:443':
          $scope.miner.friendly_name = 'WMP';
          break;
        default:
          $scope.miner.friendly_name = $scope.miner.mining_pool_url;
          break;
      }

      if ($scope.miner.mining_pool_url.indexOf('WMP') !== -1) {
        $scope.show_chart = true;
      }
    });

    $scope.getIframeSrc = function(panelId, address) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/wmp-miner-hash?orgId=1&from=now-1d&to=now&panelId=' + panelId + '&theme=light&var-address=' + encodeURIComponent(address);
    };

    $scope.getHref = function(address) {
      return 'https://www.webdscan.io/address/' + encodeURIComponent(address);
    };
  });
