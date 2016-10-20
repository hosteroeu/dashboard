'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:InstancesNewCtrl
 * @description
 * # InstancesNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('InstancesNewCtrl', function($state, $scope, $mdToast, $mdDialog, instancesService) {
    this.create = function() {
      instancesService.save({}, {
        name: $scope.name
      }).$promise.then(function() {
        $mdToast.showSimple('Instance Created Successfully');
        $state.reload();
        $mdDialog.hide();
      });
    };

    this.close = function() {
      $mdDialog.cancel();
    };
  });
