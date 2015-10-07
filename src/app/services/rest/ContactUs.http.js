(function (module) {
    'use strict';
    module.factory('ContactUs', function ($http, API_URL, $rootScope) {

        function post(email, msg) {
            return $http({
                method: 'post',
                url: API_URL + 'contact-us',
                data: {
                    email: email,
                    language: $rootScope.currentLang,
                    message: msg
                }
            });
        }

        return {
            post: post
        };
    });
})(angular.module('vx'));