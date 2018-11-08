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
        var regex1 = /([0-9.])+ hashes\/s/g;
        var regex2 = /([0-9.])+ H\/s/g;
        var regex3 = /([0-9.])+ kH\/s/g;

        var found1 = event.data.match(regex1);
        var found2 = event.data.match(regex2);
        var found3 = event.data.match(regex3);

        if (found1) {
          $scope.power = found1[0];
        }

        if (found2) {
          $scope.power = found2[0];
        }

        if (found3) {
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
  });
