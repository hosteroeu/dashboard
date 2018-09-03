'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinerCtrl
 * @description
 * # MinerCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinerCtrl', function($scope, $state, $mdDialog, minersService) {
    $scope.miner = null;

    minersService.get({
      id: $state.params.miner
    }).$promise.then(function(res) {
      $scope.miner = res;
    });
  });
