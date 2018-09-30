'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersLogsCtrl
 * @description
 * # MinersLogsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersLogsCtrl', function($state, minersService, $scope, ansi2html) {
    var socket;
    $scope.logs = [];
    $scope.miner = $state.params.miner;
    $scope.power = '0 h/s';

    minersService.get({
      id: $state.params.miner,
      controller: 'logs'
    }).$promise.then(function(data) {
      socket = new WebSocket(data.ws);

      socket.onopen = function(event) {
        console.log(event);
      };

      socket.onmessage = function(event) {
        var regex = /([0-9.])+ hashes\/s/g;
        var found = event.data.match(regex);

        if (found) {
          $scope.power = found[0];
        }

        $scope.logs.push({
          message: ansi2html.toHtml(event.data)
        });
        $scope.$apply();
      };
    });

    $scope.$on("$destroy", function() {
      socket.close();
    });
  });
