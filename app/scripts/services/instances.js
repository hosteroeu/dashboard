'use strict';

/**
 * @ngdoc factory
 * @name atlasApp.instances
 * @description
 * # instances
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .factory('instancesService', function($resource, api) {
    return $resource(api.url + api.version +
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
