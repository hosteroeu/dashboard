'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinerCtrl
 * @description
 * # MinerCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinerCtrl', function($scope, $state, $mdDialog, $mdBottomSheet, minersService) {
    $scope.miner = null;
    $scope.show_chart = false;

    minersService.get({
      id: $state.params.miner
    }).$promise.then(function(res) {
      $scope.miner = res;
      $scope.miner.wallet = JSON.parse($scope.miner.wallet);

      switch ($scope.miner.mining_pool_url) {
        case 'https://www.webdollarminingpool.com/pool/1/WMP/0.02/c01f57930c27e78e434de1243ae02b98e56d6cd3df42d136be1a1c0a0a9a8624/https:$$server.webdollarminingpool.com:443':
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

    $scope.open_details = function() {
      $mdBottomSheet.show({
        templateUrl: 'views/miners.details.html',
        controller: 'MinersDetailsCtrl',
        locals: {
          miner: $scope.miner
        }
      });
    };
  });
