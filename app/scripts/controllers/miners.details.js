'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersDetailsCtrl
 * @description
 * # MinersDetailsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersDetailsCtrl', function(miner, minersService, hostsService, $state, $scope, $mdDialog, $mdToast, $mdBottomSheet) {
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

    $scope.redeploy = function($event) {
      var confirm = $mdDialog.confirm()
        .title('Do you want to re-deploy the miner?')
        .textContent('Re-deploying the miner takes several minutes and will delete the host and the miner.')
        .ariaLabel('Re-deploy')
        .targetEvent($event)
        .ok('Re-deploy')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        minersService.remove({
          id: miner.id
        });

        hostsService.remove({
          id: miner.host_id
        });

        $mdToast.showSimple('Re-deploying started... It will take several minutes');

        setTimeout(function() {
          $mdBottomSheet.hide();

          if ($state.current.name === 'miners') {
            $state.reload();
          } else {
            $state.go('miners');
          }
        }, 2000);
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
