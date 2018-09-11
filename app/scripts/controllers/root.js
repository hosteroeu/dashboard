'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function($scope, $mdDialog) {
    var profile = JSON.parse(localStorage.getItem('profile'));

    $scope.profile = profile;

    this.openMenu = function($mdMenu, ev) {
      console.log('a');
      $mdMenu.open(ev);
    };
  });
