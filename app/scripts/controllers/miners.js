'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:MinersCtrl
 * @description
 * # MinersCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('MinersCtrl', function($scope, $mdDialog, minersService) {
    //$scope.miners = minersService.query();
    $scope.miners = [{
      id: 'webd-cpp-miner-1',
      wallet: 'WEBD$gDXtmzFaIdgZHcg9Lti#6fsMB6MmSr#eM7$',
      host: 'WEBD-Host-1',
      thread: 12
    },{
      id: 'webd-cpp-miner-2',
      wallet: 'WEBD$gDXtmzFaIdgZHcg9Lti#6fsMB6MmSr#eM7$',
      host: 'WEBD-Host-2',
      thread: 12
    }];

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'MinersNewCtrl',
        controllerAs: 'minersNewCtrl',
        templateUrl: 'views/miners.new.html',
        targetEvent: $event,
        clickOutsideToClose: false
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

    this.open_url = function(instance) {
      var account = JSON.parse(localStorage.getItem('account'));

      window.open('//' + instance.name + '.' + account.name + '.wordpress.hoste.ro');
    };
  });
