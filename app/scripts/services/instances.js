'use strict';

/**
 * @ngdoc factory
 * @name atlasApp.instances
 * @description
 * # instances
 * Service in the atlasApp.
 */
angular.module('atlasApp')
  .factory('instances', function($resource) {
    return $resource('http://localhost:8080/v1' +
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
