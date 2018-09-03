'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsNewCtrl
 * @description
 * # HostsNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsNewCtrl', function($state, $scope, $mdToast, $mdDialog) {
    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    this.close = function() {
      $mdToast.showSimple('Host will be added in a few minutes');
      $state.reload();
      $mdDialog.hide();
    };
  });
