'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostCtrl', function($scope, $state, $mdDialog, hostsService) {
    $scope.host = hostsService.get({
      id: $state.params.host
    });
  });
