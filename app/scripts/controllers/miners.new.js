'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersNewCtrl
 * @description
 * # MinersNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersNewCtrl', function($scope, $mdToast, $mdDialog, minersService, hostsService, host) {
    console.log(host);

    if (!host) {
      $scope.hosts = hostsService.query();
    } else {
      $scope.hosts = [host];
      $scope.selected_host = host;
    }

    var account = JSON.parse(localStorage.getItem('account'));

    this.create = function() {
      $mdDialog.hide();

      minersService.save({}, {
        name: $scope.name,
        rancher_environment_id: account.rancher_environment_id,
        // TODO: account_name should be set by the API
        account_name: account.name
      }).$promise.then(function() {
        $mdToast.showSimple('Miner Created Successfully');
        $state.reload();
      });
    };

    this.close = function() {
      $mdDialog.cancel();
    };
  });
