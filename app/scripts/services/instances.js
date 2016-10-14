'use strict';

/**
 * @ngdoc factory
 * @name atlasApp.instances
 * @description
 * # instances
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .factory('instancesService', function($resource) {
    return $resource('//api.hoste.ro/v1' +
      '/instances/:id/:controller/:verb/:action', {
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
