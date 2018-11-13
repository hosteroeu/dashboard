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

    $scope.logs = [];
    $scope.hosts = hostsService.query();
    $scope.accounts = accountsService.query();
    $scope.total_power = 0;

    minersService.query().$promise.then(function(res) {
      $scope.miners = res;

      res.forEach(function(miner) {
        $scope.total_power += parseInt(miner.power) || 0;
      });
    });

    logsService.query().$promise.then(function(res) {
      res.forEach(function(log) {
        var extra_message = JSON.parse(log.extra_message);
        var extra_message_curated = [];

        Object.keys(extra_message).forEach(function(key) {
          if (key !== 'id' && key !== 'status' && key !== 'deployed') {
            return;
          }

          extra_message_curated.push(key + '=' + extra_message[key]);
        });

        log.extra_message = extra_message_curated;
        $scope.logs.push(log);
      });
    });

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
