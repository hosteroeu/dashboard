'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:HostsCtrl
 * @description
 * # HostsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('HostsCtrl', function($scope, $mdDialog, $mdToast, $state, hostsService, minersService, accountsService) {
    $scope.hosts = null;
    $scope.hosts_deployed = [];
    $scope.hosts_stopped = [];
    $scope.filter = '';

    hostsService.query().$promise.then(function(res) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);

      $scope.hosts = [];

      res.forEach(function(host) {
        var updated = Date.parse(host.updated_at);

        if (host.status === 'stopped' && updated < yesterday.getTime()) {
          return;
        }

        $scope.hosts.push(host);
      });

      $scope.hosts.forEach(function(host) {
        if (host.status === 'stopped') {
          $scope.hosts_stopped.push(host);
        } else if (host.deployed === '1') {
          $scope.hosts_deployed.push(host);
        }
      });
    });

    /*
    setInterval(function() {
      hostsService.query().$promise.then(function(res) {
        if ($scope.hosts.length !== res.length) {
          $scope.hosts = res;
        }
      });
    }, 10 * 1000);
    */

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'HostsNewCtrl',
        controllerAs: 'hostsNewCtrl',
        templateUrl: 'views/hosts.new.html',
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };

    this.deploy_miner = function($event, host) {
      $mdDialog.show({
        controller: 'MinersNewCtrl',
        controllerAs: 'minersNewCtrl',
        templateUrl: 'views/miners.new.html',
        targetEvent: $event,
        clickOutsideToClose: false,
        locals: {
          host: host
        }
      });
    };

    this.deploy_miner_fast = function($event, host) {
      var account = JSON.parse(localStorage.getItem('account'));
      var default_wallet = {
        version: '0.1',
        address: null,
        publicKey: '01',
        privateKey: '02'
      };

      accountsService.get({
        id: account.id
      }).$promise.then(function(account) {
        var mining_pool_url = account.mining_pool_url;
        var selected_host = host;
        var name = 'webd-miner-' + selected_host.id;
        var wallet;

        try {
          wallet = JSON.parse(account.wallet).address;
        } catch (e) {
          $mdToast.showSimple('Set the wallet in Settings');
          return;
        }

        default_wallet.address = decodeURIComponent(wallet);

        minersService.save({}, {
          name: name,
          status: 'stopped',
          server_port: '8000',
          mining_pool_url: mining_pool_url,
          domain: 'wd.hoste.ro',
          wallet: JSON.stringify(default_wallet),
          terminal_workers_type: 'cpu-cpp',
          terminal_workers_cpu_max: selected_host.cpu_count || '0',
          image_uuid: 'docker:morion4000/node:v2',
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
          setTimeout($state.reload, 2000);
        });
      });
    };

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };
  });
