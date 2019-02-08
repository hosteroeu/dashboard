'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:LogsCtrl
 * @description
 * # LogsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('LogsCtrl', function($scope, $rootScope, $state, minersService, $sce, ansi2html) {
    $scope.miner = minersService.get({
      id: $state.params.miner
    });
    $scope.state = $state;
    $scope.logs = [];
    $scope.power = '0 h/s';
    $rootScope.minimalLayout = true;

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
        var regex1 = /([0-9.])+ hashes\/s/g;
        var regex2 = /([0-9.])+ H\/s/g;
        var regex3 = /([0-9.])+ kH\/s/g;
        var regex4 = /([0-9.])+ MH\/s/g;

        var found1 = event.data.match(regex1);
        var found2 = event.data.match(regex2);
        var found3 = event.data.match(regex3);
        var found4 = event.data.match(regex4);

        if (found1) {
          $scope.power = found1[0];
        } else if (found2) {
          $scope.power = found2[0];
        } else if (found3) {
          $scope.power = found3[0];
        } else if (found4) {
          $scope.power = found4[0];
        }

        $scope.logs.push({
          message: ansi2html.toHtml(event.data)
        });

        $scope.$apply();

        window.scrollTo(0, document.body.scrollHeight);
      };
    });

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    };

    $scope.$on("$destroy", function() {
      socket.close();
    });
  });
