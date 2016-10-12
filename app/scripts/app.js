'use strict';

/**
 * @ngdoc overview
 * @name atlasApp
 * @description
 * # atlasApp
 *
 * Main module of the application.
 */
angular
  .module('atlasApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'auth0.lock',
    'angular-jwt'
  ])
  .config(function($routeProvider, lockProvider, $httpProvider, jwtOptionsProvider) {
    lockProvider.init({
      clientID: 'E6Zeo9d6DEXfEeFyvBPeYw3tYdtYNVDP',
      domain: 'morion4000.auth0.com'
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/instances', {
        templateUrl: 'views/instances.html',
        controller: 'InstancesCtrl',
        controllerAs: 'instances'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, auth, authManager, lock) {
    lock.interceptHash();

    $rootScope.authService = auth;

    auth.registerAuthenticationListener();

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
  });
