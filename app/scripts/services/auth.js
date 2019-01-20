'use strict';

/**
 * @ngdoc service
 * @name atlasApp.auth
 * @description
 * # auth
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .service('authService', function($rootScope, $state, lock, authManager, accountsService) {
    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      localStorage.removeItem('account');
      authManager.unauthenticate();
      userProfile = {};

      $state.go('login');
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.accessToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);

          accountsService.get({
            controller: 'sync'
          }).$promise.then(function(account) {
            localStorage.setItem('account', JSON.stringify(account));

            lock.hide();
            $state.go('dashboard');

            accountsService.update({
              id: account.id
            }, {
              email: profile.email,
              full_name: profile.name
            }).$promise.then(function() {
              // Refresh page to reload root controller's data
              location.reload();
            });
          });
        });
      });

      $rootScope.$on('tokenHasExpired', function() {
        $state.go('login');
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
    };
  });
