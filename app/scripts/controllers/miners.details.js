'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersDetailsCtrl
 * @description
 * # MinersDetailsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersDetailsCtrl', function(miner, minersService, hostsService, $state, $scope, $mdBottomSheet) {
    var socket;

    minersService.get({
      id: miner.id,
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

    $scope.details = function() {
      $mdBottomSheet.hide();

      $state.go('miner', {
        miner: miner.id
      });
    };

    $scope.logs = function() {
      $mdBottomSheet.hide();

      $state.go('miner_logs', {
        miner: miner.id
      });
    };

    $scope.remove = function() {
      $mdBottomSheet.hide();

      minersService.remove({
        id: miner.id
      }).$promise.then(function() {
        if ($state.current.name === 'miners') {
          $state.reload();
        } else {
          $state.go('miners');
        }

        hostsService.update({
            id: miner.host_id
          }, {
            deployed: '0'
          }).$promise
          .then(console.log)
          .catch(console.error);
      });
    };
  });
