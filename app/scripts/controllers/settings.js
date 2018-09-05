'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SettingsCtrl
 * @description
 * # AccountCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('SettingsCtrl', function($scope, $mdToast, $state, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var default_wallet = {
      version: '0.1',
      address: null,
      publicKey: '01',
      privateKey: '02'
    };

    $scope.mining_pool_url = null;

    accountsService.get({
      id: account.id
    }).$promise.then(function(account) {
      $scope.mining_pool_url = account.mining_pool_url;
      var wallet = JSON.parse(account.wallet);
      $scope.wallet = wallet.address;
    });

    this.update = function() {
      default_wallet.address = decodeURIComponent($scope.wallet);

      accountsService.update({
        id: account.id
      }, {
        mining_pool_url: $scope.mining_pool_url,
        wallet: JSON.stringify(default_wallet)
      }).$promise.then(function() {
        $mdToast.showSimple('Settings Updated Successfully');
        $state.reload();
      });
    };
  });
