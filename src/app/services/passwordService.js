(function (module) {
    'use strict';
    module.factory('Password', function ($http, API_URL, $window) {
        var PasswordServer = {
            restore: function (email, language) {
                return $http({
                    method: 'post',
                    url: API_URL + 'restorePassword',
                    data: {
                        email: email,
                        language: language,
                        state: $window.location.origin + '/restorePassword?recoveryToken={{recoveryToken}}'
                    }
                });
            },
            checkRecoveryToken: function (recoveryToken) {
                return $http({
                    url: API_URL + 'checkRecoveryToken',
                    params: {recoveryToken: recoveryToken}
                });
            },
            changePassword: function (recoveryToken, password, language) {
                return $http({
                    method: 'post',
                    url: API_URL + 'changePassword',
                    data: {recoveryToken: recoveryToken, password: password, language: language}
                });
            }
        };

        return PasswordServer;
    });

})(angular.module('vx'));
