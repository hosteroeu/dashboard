'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:InstancesCtrl
 * @description
 * # InstancesCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('InstancesCtrl', function($scope, $mdDialog, instancesService) {
    $scope.instances = instancesService.query();

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'InstancesNewCtrl',
        controllerAs: 'instancesNewCtrl',
        templateUrl: 'views/instances.new.html',
        targetEvent: $event,
        clickOutsideToClose: false
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

    this.open_url = function(instance) {
      var account = JSON.parse(localStorage.getItem('account'));

      window.open('//' + instance.name + '.' + account.name + '.wordpress.hoste.ro');
    };
  });
