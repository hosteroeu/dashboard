'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:InstructionsCtrl
 * @description
 * # InstructionsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('InstructionsCtrl', function ($scope) {
    var account = JSON.parse(localStorage.getItem('account'));
    //var profile = JSON.parse(localStorage.getItem('profile'));

    $scope.account = account;
  });
