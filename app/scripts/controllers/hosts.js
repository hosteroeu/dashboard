'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsCtrl
 * @description
 * # HostsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsCtrl', function($scope, $mdDialog, hostsService) {
    $scope.hosts = null;

    hostsService.query().$promise.then(function(res) {
      $scope.hosts = res;
    });

    setInterval(function() {
      hostsService.query().$promise.then(function(res) {
        if ($scope.hosts.length !== res.length) {
          $scope.hosts = res;
        }
      });
    }, 10 * 1000);

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'HostsNewCtrl',
        controllerAs: 'hostsNewCtrl',
        templateUrl: 'views/hosts.new.html',
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };

    this.deploy_miner = function($event, host) {
      $mdDialog.show({
        controller: 'MinersNewCtrl',
        controllerAs: 'minersNewCtrl',
        templateUrl: 'views/miners.new.html',
        targetEvent: $event,
        clickOutsideToClose: false,
        locals: {
          host: host
        }
      });
    };

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };
  });
