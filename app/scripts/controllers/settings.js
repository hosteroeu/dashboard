'use strict';

/**
 * @ngdoc function
 * @name atlasApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the atlasApp
 */
angular.module('atlasApp')
  .controller('SettingsCtrl', function($scope, $mdToast, $state, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));
    var _this = this;

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      localStorage.setItem('account', JSON.stringify(_account));

      _this.auto_deploy = _account.auto_deploy;
      _this.auto_deploy_coin = _account.auto_deploy_coin;
    });

    this.update = function() {
      accountsService.update({
        id: account.id
      }, {
        auto_deploy: this.auto_deploy,
        auto_deploy_coin: this.auto_deploy_coin
      }).$promise.then(function() {
        $mdToast.showSimple('Settings Updated Successfully');
        $state.reload();
      });
    };
  });
