'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersNewCtrl
 * @description
 * # MinersNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersNewCtrl', function($scope, $state, $mdToast, $mdDialog, minersService, hostsService, accountsService, host) {
    var account = JSON.parse(localStorage.getItem('account'));
    var default_wallet_webdollar = {
      version: '0.1',
      address: null,
      publicKey: '01',
      privateKey: '02'
    };

    if (!host) {
      $scope.hosts = hostsService.query();
    } else {
      $scope.hosts = [host];
      $scope.selected_host = host;
    }

    accountsService.get({
      id: account.id
    }).$promise.then(function(account) {
      $scope.mining_pool_url = account.mining_pool_url_webdollar;
      var wallet = JSON.parse(account.wallet_webdollar);
      $scope.wallet_webdollar = wallet.address;
      $scope.wallet_nerva = account.wallet_nerva;
      $scope.selected_coin = account.auto_deploy_coin;
    });

    this.create = function() {
      var selected_host = JSON.parse($scope.selected_host);
      var name = 'miner-' + selected_host.id;
      var new_miner = {
        name: name,
        coin: $scope.selected_coin,
        status: 'stopped',
        deployed: '2',
        threads: selected_host.cpu_count || '0',
        host_id: selected_host.id
      };

      default_wallet_webdollar.address = decodeURIComponent($scope.wallet_webdollar);

      switch ($scope.selected_coin) {
        case 'webdollar':
          new_miner.server_port = '8000';
          new_miner.mining_pool_url = $scope.mining_pool_url;
          new_miner.domain = 'wd.hoste.ro';
          new_miner.wallet = JSON.stringify(default_wallet_webdollar);
          new_miner.image_uuid = 'docker:morion4000/node:v2';
          new_miner.command = 'sh start_pool_mining.sh';
          new_miner.wallet_secret_url = '7e5d522a70ce4c455f6875d01c22727e';
          break;

        case 'nerva':
          new_miner.wallet = $scope.wallet_nerva;
          new_miner.image_uuid = 'docker:morion4000/nerva';
          break;
      }

      if (selected_host.deployed !== '0') {
        $mdToast.showSimple('Host is already deployed');

        return;
      }

      $mdDialog.hide();

      minersService.save({}, new_miner).$promise.then(function() {
        hostsService.update({
          id: selected_host.id
        }, {
          deployed: '2'
        });

        $mdToast.showSimple('Miner Created Successfully');
        setTimeout($state.reload, 2000);
      });
    };

    this.close = function() {
      $mdDialog.cancel();
    };
  });
