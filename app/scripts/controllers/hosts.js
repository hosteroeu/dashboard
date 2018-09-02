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
    $scope.hosts = hostsService.query();

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'HostsNewCtrl',
        controllerAs: 'hostsNewCtrl',
        templateUrl: 'views/hosts.new.html',
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };

    this.deploy_miners = function($event, host) {
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
