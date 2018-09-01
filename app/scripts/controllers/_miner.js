'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinerCtrl
 * @description
 * # MinerCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinerCtrl', function($scope, $mdDialog, minersService) {
    $scope.miner = {
      id: 'webd-cpp-miner-1',
      wallet: 'WEBD$gDXtmzFaIdgZHcg9Lti#6fsMB6MmSr#eM7$',
      host: 'WEBD-Host-1',
      thread: 12
    };
  });
