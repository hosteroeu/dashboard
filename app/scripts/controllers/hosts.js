'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsCtrl
 * @description
 * # HostsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsCtrl', function($scope, $state, hostsService) {
    $scope.hosts = null;
    $scope.hosts_deployed = [];
    $scope.hosts_stopped = [];
    $scope.filter = '';

    hostsService.query().$promise.then(function(res) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      $scope.hosts = [];

      res.forEach(function(host) {
        var updated = Date.parse(host.updated_at);

        if (host.status === 'stopped' && updated < yesterday.getTime()) {
          return;
        }

        $scope.hosts.push(host);
      });

      $scope.hosts.forEach(function(host) {
        if (host.status === 'stopped') {
          $scope.hosts_stopped.push(host);
        } else if (host.deployed === '1') {
          $scope.hosts_deployed.push(host);
        }
      });
    });

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };

    this.remove = function(host) {
      /*
      var confirm = $mdDialog.confirm()
        .title('Do you want to remove the host?')
        .textContent('The host will not be powered-off. You need to manually power-off the machine.')
        .ariaLabel('Remove')
        .targetEvent($event)
        .ok('Remove')
        .cancel('Cancel');
*/

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
