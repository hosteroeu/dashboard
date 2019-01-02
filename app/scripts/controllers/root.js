'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, $mdDialog, hostsService, minersService, coinsService, accountsService) {
    // Wait for auth to work it's magic
    setTimeout(function() {
      $scope.global_hosts = hostsService.query();
      $scope.global_miners = minersService.query();
      $scope.global_coins = coinsService.query();

      $scope.profile = JSON.parse(localStorage.getItem('profile')) || {};
      $scope.global_account = JSON.parse(localStorage.getItem('account')) || {};
    }, 2000);

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };
  });
