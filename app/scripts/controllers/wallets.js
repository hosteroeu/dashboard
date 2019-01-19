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
    var default_wallet_webdollar = {
      version: '0.1',
      address: null,
      publicKey: '01',
      privateKey: '02'
    };

    var _this = this;

    _this.state = $state;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      localStorage.setItem('account', JSON.stringify(_account));

      _this.mining_pool_url_webdollar = _account.mining_pool_url_webdollar;
      _this.wallet_nerva = _account.wallet_nerva;
      _this.wallet_webchain = _account.wallet_webchain;
      _this.password_webchain = _account.password_webchain;
      _this.mining_pool_url_webchain = _account.mining_pool_url_webchain;

      if (_account.wallet_webdollar) {
        var wallet = JSON.parse(_account.wallet_webdollar);
        _this.wallet_webdollar = wallet.address;
      }
    });

    _this.update = function() {
      if (_this.wallet_webdollar) {
        default_wallet_webdollar.address = decodeURIComponent(_this.wallet_webdollar);
      }

      accountsService.update({
        id: account.id
      }, {
        mining_pool_url_webdollar: _this.mining_pool_url_webdollar,
        wallet_webdollar: JSON.stringify(default_wallet_webdollar),
        wallet_nerva: _this.wallet_nerva,
        wallet_webchain: _this.wallet_webchain,
        password_webchain: _this.password_webchain,
        mining_pool_url_webchain: _this.mining_pool_url_webchain
      }).$promise.then(function() {
        window.toastr.success('Wallet was updated');

        $state.reload();
      });
    };
  });
