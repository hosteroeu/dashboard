'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('AccountCtrl', function($scope) {
    $scope.user = JSON.parse(localStorage.getItem('profile'));
  });
