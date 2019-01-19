'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersCtrl
 * @description
 * # MinersCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersCtrl', function($scope, $state, minersService, hostsService) {
    $scope.miners = null;
    $scope.hosts = hostsService.query();
    $scope.miners_stopped = [];
    $scope.miners_running = [];
    $scope.filter = '';

    minersService.query().$promise.then(function(res) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      $scope.miners = [];

      res.forEach(function(miner) {
        var updated = Date.parse(miner.updated_at);

        if (miner.status === 'stopped' && updated < yesterday.getTime()) {
          return;
        }

        $scope.miners.push(miner);
      });

      $scope.miners.forEach(function(miner) {
        if (miner.status === 'stopped') {
          $scope.miners_stopped.push(miner);
        } else {
          $scope.miners_running.push(miner);
        }
      });
    });

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'plug';

        case 'stopped':
          return 'power-off';
      }
    };

    this.open_url = function(instance) {
      var account = JSON.parse(localStorage.getItem('account'));

      window.open('//' + instance.name + '.' + account.name + '.wordpress.hoste.ro');
    };

    this.redeploy_all = function() {
      /*
      var confirm = $mdDialog.confirm()
        .title('Do you want to re-deploy all the miners?')
        .textContent('Re-deploying the miners takes several minutes and will delete all your hosts and miners.')
        .ariaLabel('Redeploy')
        .targetEvent($event)
        .ok('Re-deploy')
        .cancel('Cancel');
      */

      $scope.miners.forEach(function(miner) {
        minersService.remove({
          id: miner.id
        });
      });

      $scope.hosts.forEach(function(host) {
        hostsService.remove({
          id: host.id
        });
      });

      setTimeout(function() {
        window.toastr.info('Re-deploying started... It will take several minutes');
        $state.reload();
      }, 2000);
    };

    this.redeploy = function(miner) {
      /*
      var confirm = $mdDialog.confirm()
        .title('Do you want to re-deploy the miner?')
        .textContent('Re-deploying the miner takes several minutes and will delete the host and the miner.')
        .ariaLabel('Re-deploy')
        .targetEvent($event)
        .ok('Re-deploy')
        .cancel('Cancel');
      */

      minersService.remove({
        id: miner.id
      });

      hostsService.remove({
        id: miner.host_id
      });

      window.toastr.info('Re-deploying started... It will take several minutes');

      setTimeout(function() {
        if ($state.current.name === 'miners') {
          $state.reload();
        } else {
          $state.go('miners');
        }
      }, 2000);
    };

    this.remove = function(miner) {
      /*
      var confirm = $mdDialog.confirm()
        .title('Do you want to remove the miner?')
        .textContent('The hosts will not be deleted. If you want to stop using the host, you need to delete it as well.')
        .ariaLabel('Remove')
        .targetEvent($event)
        .ok('Remove')
        .cancel('Cancel');
      */

      minersService.remove({
        id: miner.id
      }).$promise.then(function() {
        if ($state.current.name === 'miners') {
          $state.reload();
        } else {
          $state.go('miners');
        }

        hostsService.update({
            id: miner.host_id
          }, {
            deployed: '0'
          }).$promise
          .then(console.log)
          .catch(console.error);
      });
    };
  });
