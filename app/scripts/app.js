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
    'ui.router',
    'auth0.lock',
    'angular-jwt',
    'angular.filter'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, lockProvider, jwtOptionsProvider) {
    lockProvider.init({
      clientID: 'E6Zeo9d6DEXfEeFyvBPeYw3tYdtYNVDP',
      domain: 'morion4000.auth0.com',
      options: {
        closable: false,
        languageDictionary: {
          title: 'Hostero'
        },
        theme: {
          //logo: '/images/hostero_logo_black.png',
          //primaryColor: 'blue'
        }
      }
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('token');
      },
      whiteListedDomains: ['localhost', 'api.hoste.ro', 'dashboard.hoste.ro'],
      unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mainCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('account', {
        url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('instances', {
        url: '/instances',
        templateUrl: 'views/instances.html',
        controller: 'InstancesCtrl',
        controllerAs: 'instancesCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('orange');

    $mdThemingProvider.theme('default')
      .dark();
  })
  .run(function($rootScope, $location, authService, authManager, lock, jwtHelper) {
    lock.interceptHash();

    $rootScope.authService = authService;

    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // When a location change is detected
    $rootScope.$on('$locationChangeStart', function() {
      var token = localStorage.getItem('token');

      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          authManager.authenticate();
        } else {
          localStorage.removeItem('token');

          $location.path('/login');
        }
      } else {
        $location.path('/login');
      }
    });

    // Listen for 401 unauthorized requests and redirect
    // the user to the login page
    authManager.redirectWhenUnauthenticated();
  });
