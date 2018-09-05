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
    var default_wallet = {
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
      $scope.mining_pool_url = account.mining_pool_url;
      var wallet = JSON.parse(account.wallet);
      $scope.wallet = wallet.address;
    });

    this.create = function() {
      var selected_host = JSON.parse($scope.selected_host);
      var name = 'webd-miner-' + selected_host.id;

      if (selected_host.deployed !== '0') {
        $mdToast.showSimple('Host is already deployed');

        return;
      }

      default_wallet.address = decodeURIComponent($scope.wallet);

      $mdDialog.hide();

      minersService.save({}, {
        name: name,
        status: 'stopped',
        server_port: '8000',
        mining_pool_url: $scope.mining_pool_url,
        domain: 'wd.hoste.ro',
        wallet: JSON.stringify(default_wallet),
        terminal_workers_type: 'cpu-cpp',
        terminal_workers_cpu_max: selected_host.cpu_count || '0',
        image_uuid: 'docker:morion4000/node:pool_miner_cpp',
        command: 'sh start_pool_mining.sh',
        wallet_secret_url: '7e5d522a70ce4c455f6875d01c22727e',
        host_id: selected_host.id,
      }).$promise.then(function() {
        hostsService.update({
          id: selected_host.id
        }, {
          deployed: '2'
        });

        $mdToast.showSimple('Miner Created Successfully');
        $state.reload();
      });
    };

    this.close = function() {
      $mdDialog.cancel();
    };
  });
