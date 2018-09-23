'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersLogsCtrl
 * @description
 * # MinersLogsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersLogsCtrl', function($state, minersService, $scope) {
    $scope.logs = [];
    var socket;

    minersService.get({
      id: $state.params.miner,
      controller: 'logs'
    }).$promise.then(function(data) {
      socket = new WebSocket(data.ws);

      socket.onopen = function(event) {
        console.log(event);
      };

      socket.onmessage = function(event) {
        $scope.logs.push({
          message: event.data
        });
        $scope.$apply();
      };
    });

    $scope.$on("$destroy", function() {
      socket.close();
    });
  });
