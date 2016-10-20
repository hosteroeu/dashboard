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
  });
