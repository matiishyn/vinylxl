(function(module) {
    'use strict';

    module.factory('API', function($resource, API_URL) {
        var api = $resource(null, null, {
            get: {
                url: API_URL + ':route',
                method: 'GET',
                isArray: true
            },
            getById: {
                url: API_URL + ':route/:id',
                method: 'GET',
                isArray: false
            }
        });

        return api;
    });

})(angular.module('vx'));
