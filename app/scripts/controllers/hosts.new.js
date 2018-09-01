'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsNewCtrl
 * @description
 * # HostsNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsNewCtrl', function($state, $scope, $mdToast, $mdDialog, hostsService) {
    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    this.create = function() {
      $mdDialog.hide();

      hostsService.save({}, {
        name: $scope.name,
        rancher_environment_id: account.rancher_environment_id,
        // TODO: account_name should be set by the API
        account_name: account.name
      }).$promise.then(function() {
        $mdToast.showSimple('Host Created Successfully');
        $state.reload();
      });
    };

    this.close = function() {
      $mdToast.showSimple('Host will be added in a few minutes');
      $state.reload();
      $mdDialog.hide();
    };
  });
