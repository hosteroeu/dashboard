'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinerCtrl
 * @description
 * # MinerCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinerCtrl', function($scope, $state, minersService, $sce, ansi2html) {
    $scope.miner = null;
    $scope.state = $state;
    $scope.logs = [];
    $scope.power = '0 h/s';

    var socket;

    /*
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
    */

    minersService.get({
      id: $state.params.miner,
      controller: 'logs'
    }).$promise.then(function(data) {
      socket = new WebSocket(data.ws);

      socket.onopen = function(event) {
        console.log(event);
      };

      socket.onmessage = function(event) {
        var regex1 = /([0-9.])+ hashes\/s/g;
        var regex2 = /([0-9.])+ H\/s/g;
        var regex3 = /([0-9.])+ kH\/s/g;

        var found1 = event.data.match(regex1);
        var found2 = event.data.match(regex2);
        var found3 = event.data.match(regex3);

        if (found1) {
          $scope.power = found1[0];
        } else if (found2) {
          $scope.power = found2[0];
        } else if (found3) {
          $scope.power = found3[0];
        }

        $scope.logs.push({
          message: ansi2html.toHtml(event.data)
        });
        $scope.$apply();
      };
    });

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    };

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
    });

    $scope.getIframeSrc = function(panelId, address) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/wmp-miner-hash?orgId=1&from=now-1d&to=now&panelId=' + panelId + '&theme=light&var-address=' + encodeURIComponent(address);
    };

    $scope.getIframeSrcAlt = function(panelId, miner) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/hostero-miners-power?orgId=1&from=now-1d&to=now&panelId=' + panelId + '&theme=light&var-miner=' + miner;
    };

    $scope.getHref = function(address) {
      return 'https://www.webdscan.io/address/' + encodeURIComponent(address);
    };
  });
