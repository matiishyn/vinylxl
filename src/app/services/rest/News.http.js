(function (module) {
    'use strict';
    module.factory('News', function ($http, API_URL) {
        function subscribe(email) {
            return $http({
                method: 'post',
                url: API_URL + 'news/subscribe',
                data: {
                    email: email
                }
            });
        }

        return {
            subscribe: subscribe
        };
    });
})(angular.module('vx'));