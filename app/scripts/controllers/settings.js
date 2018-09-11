'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
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

    var _this = this;
    this.mining_pool_url = null;
    this.wallet = null;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      _this.mining_pool_url = _account.mining_pool_url;
      _this.auto_deploy = _account.auto_deploy;

      if (_account.wallet) {
        var wallet = JSON.parse(_account.wallet);
        _this.wallet = wallet.address;
      }
    });

    this.update = function() {
      default_wallet.address = decodeURIComponent(this.wallet);

      accountsService.update({
        id: account.id
      }, {
        mining_pool_url: this.mining_pool_url,
        wallet: JSON.stringify(default_wallet),
        auto_deploy: this.auto_deploy
      }).$promise.then(function() {
        $mdToast.showSimple('Settings Updated Successfully');
        $state.reload();
      });
    };
  });
