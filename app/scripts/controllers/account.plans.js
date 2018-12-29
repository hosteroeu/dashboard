'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:AccountPlansCtrl
 * @description
 * # AccountPlansCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('AccountPlansCtrl', function($state, $scope, $mdToast, $mdDialog) {
    this.account = JSON.parse(localStorage.getItem('account'));
    this.selectedPlanIndex = 0;

    switch(this.account.plan_miners) {
      case 5:
        this.selectedPlanIndex = 0;
        this.plan = 'free';
        break;
      case 20:
        this.selectedPlanIndex = 1;
        this.plan = 'miner';
        break;
      case 100:
        this.selectedPlanIndex = 2;
        this.plan = 'farm';
        break;
      case -1:
        this.plan = 'unlimited';
        break;
      default:
        this.plan = 'custom';
    }

    this.close = function() {
      $mdDialog.hide();
    };

    this.upgrade = function() {
      //$mdToast.showSimple('Host will be added in a few minutes');
      $state.reload();
      $mdDialog.hide();
    };
  });
