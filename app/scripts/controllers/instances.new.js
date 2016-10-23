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
    var account = JSON.parse(localStorage.getItem('account'));

    this.create = function() {
      instancesService.save({}, {
        name: $scope.name,
        rancher_environment_id: account.rancher_environment_id
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
