'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, $mdDialog, hostsService, minersService) {
    var profile = JSON.parse(localStorage.getItem('profile'));

    $scope.profile = profile;

    // Wait for auth to work it's magic
    setTimeout(function() {
      $scope.global_hosts = hostsService.query();
      $scope.global_miners = minersService.query();
    }, 2000);

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };
  });
