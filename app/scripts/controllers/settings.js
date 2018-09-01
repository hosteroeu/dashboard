'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SettingsCtrl
 * @description
 * # AccountCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('SettingsCtrl', function($scope) {
    $scope.profile = JSON.parse(localStorage.getItem('profile'));
  });
