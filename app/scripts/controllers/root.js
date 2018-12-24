'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, $mdDialog, hostsService, minersService, accountsService) {
    var profile = JSON.parse(localStorage.getItem('profile'));

    $scope.profile = profile;

    // Wait for auth to work it's magic
    setTimeout(function() {
      $scope.global_hosts = hostsService.query();
      $scope.global_miners = minersService.query();
      // TODO: Get fresh account
      $scope.global_account = JSON.parse(localStorage.getItem('account')) || {};
    }, 2000);

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };
  });
