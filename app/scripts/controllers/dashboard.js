'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('DashboardCtrl', function ($scope, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var profile = JSON.parse(localStorage.getItem('profile'));

    // TODO: Temporary to get the data I didn't get at registration
    accountsService.update({
      id: account.id
    }, {
      email: profile.email,
      full_name: profile.name
    });

    $scope.getIframeSrc = function(panelId) {
      return 'https://charts.webdollarminingpool.com/dashboard-solo/db/hostero-hosts?orgId=1&from=now-1d&to=now&theme=light&panelId=' + panelId + '&var-account=' + account.name;
    };
  });
