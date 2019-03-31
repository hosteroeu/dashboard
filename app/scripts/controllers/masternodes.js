'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MasternodesCtrl
 * @description
 * # MasternodesCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MasternodesCtrl', function($scope, $state, hostsService, DTOptionsBuilder) {
    $scope.masternodes = null;
    $scope.filter = '';
    $scope.dt_options = DTOptionsBuilder.newOptions()
      .withDisplayLength(25)
      .withOption('retrieve', true);

    var getMasternodes = function () {
      hostsService.query().$promise.then(function(res) {
        $scope.masternodes = [];

        res.forEach(function(host) {
          if (host.user_id !== 'shared') {
            return;
          }

          $scope.masternodes.push(host);
        });
      });
    };

    var interval = setInterval(getMasternodes, 60 * 1000);

    getMasternodes();

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };

    $scope.$on('$destroy', function() {
      clearInterval(interval);
    });
  });
