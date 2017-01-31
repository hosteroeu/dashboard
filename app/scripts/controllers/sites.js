'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SitesCtrl
 * @description
 * # SitesCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('SitesCtrl', function($scope, $mdDialog, sitesService) {
    $scope.sites = sitesService.query();

    this.open_new_modal = function($event) {
      $mdDialog.show({
        controller: 'SitesNewCtrl',
        controllerAs: 'sitesNewCtrl',
        templateUrl: 'views/sites.new.html',
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
