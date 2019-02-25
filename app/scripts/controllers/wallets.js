'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:WalletsCtrl
 * @description
 * # WalletsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('WalletsCtrl', function($scope, $state, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var _this = this;

    _this.state = $state;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      localStorage.setItem('account', JSON.stringify(_account));

      _this.wallets = _account;

      var webdollar_password = _account.password_webdollar.split('|');

      if (webdollar_password.length === 2) {
        _this.wallets.public_key_webdollar = webdollar_password[0];
        _this.wallets.private_key_webdollar = webdollar_password[1];
      }
    });

    _this.update = function() {
      if (_this.wallets.public_key_webdollar && _this.wallets.private_key_webdollar) {
        _this.wallets.password_webdollar = _this.wallets.public_key_webdollar +
          '|' + _this.wallets.private_key_webdollar;
      }

      accountsService.update({
        id: account.id
      }, {
        wallet_webdollar: _this.wallets.wallet_webdollar,
        mining_pool_url_webdollar: _this.wallets.mining_pool_url_webdollar,
        password_webdollar: _this.wallets.password_webdollar,
        wallet_nerva: _this.wallets.wallet_nerva,
        wallet_webchain: _this.wallets.wallet_webchain,
        password_webchain: _this.wallets.password_webchain,
        mining_pool_url_webchain: _this.wallets.mining_pool_url_webchain,
        wallet_veruscoin: _this.wallets.wallet_veruscoin,
        password_veruscoin: _this.wallets.password_veruscoin,
        mining_pool_url_veruscoin: _this.wallets.mining_pool_url_veruscoin,
        wallet_credits: _this.wallets.wallet_credits,
        password_credits: _this.wallets.password_credits,
        mining_pool_url_credits: _this.wallets.mining_pool_url_credits,
        wallet_myriad: _this.wallets.wallet_myriad,
        password_myriad: _this.wallets.password_myriad,
        mining_pool_url_myriad: _this.wallets.mining_pool_url_myriad,
        wallet_yenten: _this.wallets.wallet_yenten,
        password_yenten: _this.wallets.password_yenten,
        mining_pool_url_yenten: _this.wallets.mining_pool_url_yenten,
        wallet_globalboost: _this.wallets.wallet_globalboost,
        password_globalboost: _this.wallets.password_globalboost,
        mining_pool_url_globalboost: _this.wallets.mining_pool_url_globalboost,
        wallet_elicoin: _this.wallets.wallet_elicoin,
        password_elicoin: _this.wallets.password_elicoin,
        mining_pool_url_elicoin: _this.wallets.mining_pool_url_elicoin,
      }).$promise.then(function() {
        window.toastr.success('Wallet was updated');

        $state.reload();
      });
    };
  });
