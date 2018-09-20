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
