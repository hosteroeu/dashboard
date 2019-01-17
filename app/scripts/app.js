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
    'angular.filter',
    'angular-loading-bar',
    'ansiToHtml',
    'yaru22.angular-timeago',
    'datatables',
    'ngclipboard'
  ])
  .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider, $mdThemingProvider, lockProvider, jwtOptionsProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    lockProvider.init({
      clientID: 'E6Zeo9d6DEXfEeFyvBPeYw3tYdtYNVDP',
      domain: 'morion4000.auth0.com',
      options: {
        closable: false,
        languageDictionary: {
          title: 'Hostero Dashboard'
        },
        theme: {
          logo: '/images/hostero_logo_black_square.png',
          primaryColor: 'blue'
        }
      }
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('token');
      },
      whiteListedDomains: ['localhost', 'api.hostero.eu', 'dashboard.hostero.eu'],
      unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');

    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://charts.webdollarminingpool.com/**'
    ]);

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settingsCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('miners', {
        url: '/miners',
        templateUrl: 'views/miners.html',
        controller: 'MinersCtrl',
        controllerAs: 'minersCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('miner', {
        url: '/miners/:miner',
        templateUrl: 'views/miner.html',
        controller: 'MinerCtrl',
        controllerAs: 'minerCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('miner_logs', {
        url: '/miners/:miner/logs',
        templateUrl: 'views/miners.logs.html',
        controller: 'MinersLogsCtrl',
        controllerAs: 'minersLogsCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('install', {
        url: '/install',
        templateUrl: 'views/install.html',
        controller: 'InstallCtrl',
        controllerAs: 'installCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('hosts', {
        url: '/hosts',
        templateUrl: 'views/hosts.html',
        controller: 'HostsCtrl',
        controllerAs: 'hostsCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('host', {
        url: '/hosts/:host',
        templateUrl: 'views/host.html',
        controller: 'HostCtrl',
        controllerAs: 'hostCtrl',
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
      .state('wallets', {
        url: '/wallets',
        templateUrl: 'views/wallets.html',
        controller: 'WalletsCtrl',
        controllerAs: 'walletsCtrl',
        data: {
          requiresLogin: true
        }
      })
      .state('wallets.webdollar', {
        parent: 'wallets',
        url: '/webdollar',
        templateUrl: 'views/wallets/webdollar.html',
      })
      .state('wallets.nerva', {
        parent: 'wallets',
        url: '/nerva',
        templateUrl: 'views/wallets/nerva.html',
      })
      .state('wallets.webchain', {
        parent: 'wallets',
        url: '/webchain',
        templateUrl: 'views/wallets/webchain.html',
      })
      .state('billing', {
        url: '/billing',
        templateUrl: 'views/billing.html',
        controller: 'BillingCtrl',
        controllerAs: 'billingCtrl',
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
      .primaryPalette('blue')
      .accentPalette('indigo')
      .backgroundPalette('grey');

    //$mdThemingProvider.theme('default').dark();
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

      if (gtag) {
        gtag('config', 'UA-128907941-2', {
          'page_path': $location.path()
        });
      }

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
