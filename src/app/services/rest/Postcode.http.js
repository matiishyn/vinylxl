(function (module) {
    'use strict';

    module.factory('Postcode', function ($http, API_URL) {

        function getAddress(params) {
            return $http({
                method: 'get',
                url: API_URL + 'data-validation/postcode/',
                params: {
                    zip: params.zip,
                    number: params.number
                }
            });
        }

        return {
            getAddress: getAddress
        };
    });

})(angular.module('vx'));
