'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsDetailsCtrl
 * @description
 * # HostsDetailsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsDetailsCtrl', function(host, minersService, hostsService, $state, $scope, $mdBottomSheet) {
    var socket;

    hostsService.get({
      id: host.id,
      controller: 'stats'
    }).$promise.then(function(data) {
      socket = new WebSocket(data.ws);

      socket.onopen = function(event) {
        console.log(event);
      };

      socket.onmessage = function(event) {
        var data = JSON.parse(event.data);

        if (data.length) {
          var cpu_total_usage = (data[0].cpu.usage.system + data[0].cpu.usage.user) / data[0].cpu.usage.total * 100;
          var cpu_usage = cpu_total_usage / (data[0].cpu.usage.per_cpu_usage.length * 100) * 100;

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

      $state.go('host', {
        host: host.id
      });
    };

    $scope.remove = function() {
      $mdBottomSheet.hide();

      hostsService.remove({
          id: host.id
        }).$promise
        .then(function() {
          if ($state.current.name === 'hosts') {
            $state.reload();
          } else {
            $state.go('hosts');
          }
        })
        .catch(console.error);
    };
  });
