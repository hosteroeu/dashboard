'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersLogsCtrl
 * @description
 * # MinersLogsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersLogsCtrl', function($state, minersService, $sce, $scope, ansi2html) {
    var socket;
    $scope.logs = [];
    $scope.miner = $state.params.miner;
    $scope.power = '0 h/s';

    var miner = minersService.get({
      id: $state.params.miner
    });

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

        if (miner) {
          switch (miner.coin) {
            case 'webdollar':
              regex = /([0-9.])+ hashes\/s/g;
              break;
            case 'nerva':
              regex = /([0-9.])+ H\/s/g;
              break;
          }
        }

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

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    };

    $scope.$on("$destroy", function() {
      socket.close();
    });
  });
