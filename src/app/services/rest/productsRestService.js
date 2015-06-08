(function(module) {
    'use strict';

    module.factory('Products', function(APIConnector) {
        return new APIConnector({
            route: 'products'
        });
    });

})(angular.module('vx'));
