'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersNewCtrl
 * @description
 * # MinersNewCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersNewCtrl', function($scope, $state, $mdToast, $mdDialog, minersService, hostsService, host) {
    if (!host) {
      $scope.hosts = hostsService.query();
    } else {
      $scope.hosts = [host];
      $scope.selected_host = host;
    }

    $scope.mining_pool_url = localStorage.getItem('mining_pool_url') || '';
    $scope.wallet = localStorage.getItem('wallet') || '';

    this.create = function() {
      var selected_host = JSON.parse($scope.selected_host);
      var name = 'WEBD miner ' + selected_host.id;

      try {
        var wallet = JSON.parse($scope.wallet);
        var address = wallet.address;
        var privateKey = wallet.privateKey;
        var publicKey = wallet.publicKey;
      } catch(e) {
        $mdToast.showSimple('Wallet JSON must contain address, privateKey, and publicKey');

        return;
      }

      if (selected_host.deployed !== '0') {
        $mdToast.showSimple('Host is already deployed');

        return;
      }

      $mdDialog.hide();

      localStorage.setItem('mining_pool_url', $scope.mining_pool_url);
      localStorage.setItem('wallet', $scope.wallet);

      minersService.save({}, {
        name: name,
        status: 'stopped',
        server_port: '8000',
        mining_pool_url: $scope.mining_pool_url,
        domain: 'wd.hoste.ro',
        wallet: $scope.wallet,
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
