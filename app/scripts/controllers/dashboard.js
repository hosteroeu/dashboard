'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('DashboardCtrl', function ($scope, accountsService, hostsService, minersService, logsService) {
    var account = {
      name: ''
    };

    $scope.hosts = hostsService.query();
    $scope.miners = minersService.query();
    $scope.accounts = accountsService.query();
    $scope.logs = logsService.query();

    accountsService.get({
      controller: 'sync'
    }).$promise.then(function(_account) {
      account = _account;

      localStorage.setItem('account', JSON.stringify(account));
    });

    $scope.getIframeSrc = function(panelId) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/hostero-hosts?orgId=1&from=now-1d&to=now&theme=light&panelId=' + panelId + '&var-account=' + account.name;
    };
  });
