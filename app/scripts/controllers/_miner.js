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

    var socket;

    minersService.get({
      id: $state.params.miner,
      controller: 'stats'
    }).$promise.then(function(data) {
      socket = new WebSocket(data.ws);

      socket.onopen = function(event) {
        console.log(event);
      };

      socket.onmessage = function(event) {
        var data = JSON.parse(event.data);

        if (data.length) {
          var cpu_usage = (data[0].cpu.usage.system + data[0].cpu.usage.user) / data[0].cpu.usage.total * 100;

          $scope.cpu_usage = cpu_usage.toFixed(2);
          $scope.$apply();
        }
      };
    });

    $scope.$on("$destroy", function() {
      socket.close();
    });


    minersService.get({
      id: $state.params.miner
    }).$promise.then(function(res) {
      $scope.miner = res;

      try {
         var wallet = JSON.parse($scope.miner.wallet);
         $scope.miner.wallet = wallet.address;
      } catch (e) {

      }

      if ($scope.miner.mining_pool_url) {
        switch ($scope.miner.mining_pool_url) {
          case 'https://www.webdollarminingpool.com/pool/1/WMP/0.02/c01f57930c27e78e434de1243ae02b98e56d6cd3df42d136be1a1c0a0a9a8624/https:$$server.webdollarminingpool.com:443/r/WEBD$gAFytJYWxxEXSgfKGuBMLGNdA8dzk@hrY7$':
            $scope.miner.friendly_name = 'WMP';
            break;
          default:
            $scope.miner.friendly_name = $scope.miner.mining_pool_url;
            break;
        }

        if ($scope.miner.mining_pool_url.indexOf('WMP') !== -1) {
          $scope.show_chart = true;
        }
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
