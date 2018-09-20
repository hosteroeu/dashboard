'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostCtrl', function($scope, $state, $mdDialog, $mdBottomSheet, hostsService) {
    $scope.host = null;

    hostsService.get({
      id: $state.params.host
    }).$promise.then(function(res) {
      $scope.host = res;
    });

    $scope.getIframeSrc = function(panelId, host) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/hostero-hosts?orgId=1&from=now-1d&to=now&theme=light&panelId=' + panelId + '&var-host=' + host;
    };

    $scope.open_details = function() {
      $mdBottomSheet.show({
        templateUrl: 'views/hosts.details.html',
        controller: 'HostsDetailsCtrl',
        locals: {
          host: $scope.host
        }
      });
    };
  });
