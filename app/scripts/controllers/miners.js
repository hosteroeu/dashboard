'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersCtrl
 * @description
 * # MinersCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersCtrl', function($scope, $mdDialog, $mdToast, minersService, hostsService) {
    $scope.miners = null;
    $scope.hosts = hostsService.query();
    $scope.miners_stopped = [];
    $scope.filter = '';

    minersService.query().$promise.then(function(res) {
      $scope.miners = res;

      $scope.miners.forEach(function(miner) {
        if (miner.status === 'stopped') {
          $scope.miners_stopped.push(miner);
        }
      });
    });

    /*
    setInterval(function() {
      minersService.query().$promise.then(function(res) {
        if ($scope.miners.length !== res.length) {
          $scope.miners = res;
        }
      });
    }, 10 * 1000);
    */

    this.open_new_modal = function($event) {
      if ($scope.hosts.length > 0) {
        $mdDialog.show({
          controller: 'MinersNewCtrl',
          controllerAs: 'minersNewCtrl',
          templateUrl: 'views/miners.new.html',
          targetEvent: $event,
          clickOutsideToClose: false,
          locals: {
            host: null
          }
        });
      } else {
        $mdToast.showSimple('Please add a host first');
      }
    };

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };

    this.open_url = function(instance) {
      var account = JSON.parse(localStorage.getItem('account'));

      window.open('//' + instance.name + '.' + account.name + '.wordpress.hoste.ro');
    };
  });
