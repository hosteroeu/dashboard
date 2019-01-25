'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersNewCtrl
 * @description
 * # MinersNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersNewCtrl', function($state, minersService, hostsService, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var _this = this;
    var getHostById = function(hosts, id) {
      var host = null;

      for (var i = 0, l = hosts.length; i < l; i++) {
        if (parseInt(hosts[i].id) === parseInt(id)) {
          host = hosts[i];

          break;
        }
      }

      return host;
    };

    _this.selected_host = null;
    _this.selected_host_id = null;
    _this.threads = 0;

    hostsService.query().$promise.then(function(hosts) {
      _this.hosts = hosts;

      if ($state.params.host) {
        _this.selected_host = getHostById(_this.hosts, $state.params.host);
        _this.selected_host_id = $state.params.host;
        _this.threads = parseInt(_this.selected_host.cpu_count);
      }
    });

    _this.update_threads = function() {
      _this.selected_host = getHostById(_this.hosts, _this.selected_host_id);

      _this.threads = _this.selected_host ? parseInt(_this.selected_host.cpu_count) : 0;
    };

    accountsService.get({
      id: account.id
    }).$promise.then(function(account) {
      _this.mining_pool_url_webdollar = account.mining_pool_url_webdollar;
      _this.wallet_webdollar = account.wallet_webdollar;

      _this.wallet_nerva = account.wallet_nerva;
      _this.wallet_webchain = account.wallet_webchain;
      _this.password_webchain = account.password_webchain;
      _this.mining_pool_url_webchain = account.mining_pool_url_webchain;
      _this.wallet_veruscoin = account.wallet_veruscoin;
      _this.password_veruscoin = account.password_veruscoin;
      _this.mining_pool_url_veruscoin = account.mining_pool_url_veruscoin;
      _this.selected_coin = account.auto_deploy_coin;
    });

    _this.deploy = function() {
      if (!_this.selected_host) {
        window.toastr.warning('Please select a Host');
        return;
      }

      var name = 'miner-' + _this.selected_host.id;
      var new_miner = {
        name: name,
        coin: _this.selected_coin,
        status: 'stopped',
        deployed: '2',
        threads: _this.threads,
        host_id: _this.selected_host.id
      };

      switch (_this.selected_coin) {
        case 'webdollar':
          if (!_this.mining_pool_url_webdollar || !_this.wallet_webdollar) {
            window.toastr.warning('Please enter WebDollar information');
            return;
          }

          new_miner.mining_pool_url = _this.mining_pool_url_webdollar;
          new_miner.wallet = _this.wallet_webdollar;
          break;

        case 'nerva':
          if (!_this.wallet_nerva) {
            window.toastr.warning('Please enter Nerva information');
            return;
          }

          new_miner.wallet = _this.wallet_nerva;
          break;

        case 'webchain':
          if (!_this.wallet_webchain || !_this.password_webchain || !_this.mining_pool_url_webchain) {
            window.toastr.warning('Please enter WebChain information');
            return;
          }

          new_miner.wallet = _this.wallet_webchain;
          new_miner.password = _this.password_webchain;
          new_miner.mining_pool_url = _this.mining_pool_url_webchain;
          break;

        case 'veruscoin':
          if (!_this.wallet_veruscoin || !_this.password_veruscoin || !_this.mining_pool_url_veruscoin) {
            window.toastr.warning('Please enter VerusCoin information');
            return;
          }

          new_miner.wallet = _this.wallet_veruscoin;
          new_miner.password = _this.password_veruscoin;
          new_miner.mining_pool_url = _this.mining_pool_url_veruscoin;
          break;
      }

      if (_this.selected_host.deployed !== '0') {
        window.toastr.error('Host is already deployed');
        return;
      }

      minersService.save({}, new_miner).$promise.then(function() {
        hostsService.update({
          id: _this.selected_host.id
        }, {
          deployed: '2'
        });

        window.toastr.success('Miner was deployed');

        $state.go('miners');
      });
    };
  });
