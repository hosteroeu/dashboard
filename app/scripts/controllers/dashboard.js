'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('DashboardCtrl', function (accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var profile = JSON.parse(localStorage.getItem('profile'));

    // TODO: Temporary to get the data I didn't get at registration
    accountsService.update({
      id: account.id
    }, {
      email: profile.email,
      full_name: profile.name
    });
  });
