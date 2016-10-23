'use strict';

/**
 * @ngdoc factory
 * @name atlasApp.accounts
 * @description
 * # accounts
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .factory('accountsService', function($resource) {
    return $resource('//api.hoste.ro/v1' +
      '/accounts/:id/:controller/:verb/:action', {
        id: '@id',
        controller: '@controller',
        verb: '@verb',
        action: '@action'
      }, {
        'update': {
          method: 'PUT'
        }
      });
  });
