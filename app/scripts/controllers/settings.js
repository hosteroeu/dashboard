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
    var default_wallet_webdollar = {
      version: '0.1',
      address: null,
      publicKey: '01',
      privateKey: '02'
    };

    var _this = this;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      _this.mining_pool_url_webdollar = _account.mining_pool_url_webdollar;
      _this.wallet_nerva = _account.wallet_nerva;
      _this.auto_deploy = _account.auto_deploy;
      _this.auto_deploy_coin = _account.auto_deploy_coin;

      if (_account.wallet_webdollar) {
        var wallet = JSON.parse(_account.wallet_webdollar);
        _this.wallet_webdollar = wallet.address;
      }
    });

    this.update = function() {
      default_wallet_webdollar.address = decodeURIComponent(this.wallet_webdollar);

      accountsService.update({
        id: account.id
      }, {
        mining_pool_url_webdollar: this.mining_pool_url_webdollar,
        wallet_webdollar: JSON.stringify(default_wallet_webdollar),
        wallet_nerva: this.wallet_nerva,
        auto_deploy: this.auto_deploy,
        auto_deploy_coin: this.auto_deploy_coin
      }).$promise.then(function() {
        $mdToast.showSimple('Settings Updated Successfully');
        $state.reload();
      });
    };
  });
