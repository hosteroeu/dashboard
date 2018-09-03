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
    $scope.miners = null;

    minersService.query().$promise.then(function(res) {
      $scope.miners = res;
    });

    setInterval(function() {
      minersService.query().$promise.then(function(res) {
        if ($scope.miners.length !== res.length) {
          $scope.miners = res;
        }
      });
    }, 10 * 1000);

    this.open_new_modal = function($event) {
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
