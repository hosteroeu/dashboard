'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SitesNewCtrl
 * @description
 * # SitesNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('SitesNewCtrl', function($state, $scope, $mdToast, $mdDialog, sitesService) {
    var account = JSON.parse(localStorage.getItem('account'));

    this.create = function() {
      $mdDialog.hide();

      sitesService.save({}, {
        name: $scope.name,
        rancher_environment_id: account.rancher_environment_id,
        // TODO: account_name should be set by the API
        account_name: account.name
      }).$promise.then(function() {
        $mdToast.showSimple('Site Created Successfully');
        $state.reload();
      });
    };

    this.close = function() {
      $mdDialog.cancel();
    };
  });
