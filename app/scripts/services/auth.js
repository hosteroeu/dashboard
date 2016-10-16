'use strict';

/**
 * @ngdoc service
 * @name atlasApp.auth
 * @description
 * # auth
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .service('authService', function($rootScope, $state, lock, authManager) {
    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
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

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
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
