'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('RootCtrl', function ($scope) {
    var profile = JSON.parse(localStorage.getItem('profile'));

    $scope.profile = profile;
  });
