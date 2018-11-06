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

    $scope.global_hosts = hostsService.query();
    $scope.global_miners = minersService.query();

    this.openMenu = function($mdMenu, ev) {
      $mdMenu.open(ev);
    };
  });
