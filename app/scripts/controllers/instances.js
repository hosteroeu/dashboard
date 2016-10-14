'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:InstancesCtrl
 * @description
 * # InstancesCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('InstancesCtrl', function($scope, instances) {
    $scope.query = instances.query();
  });
