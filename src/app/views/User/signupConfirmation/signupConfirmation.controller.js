(function (module) {
    'use strict';
    module.controller('signupConfirmationCtrl', function ($scope, $state, $stateParams, Auth) {
        if ($stateParams.token) {
            Auth.setToken($stateParams.token);
            if ($stateParams.name) {
                Auth.setUsername($stateParams.name);
            }
        }

        $scope.redirectState = $state.params.redirect;

        // todo temp solution
        $scope.redirectTitle = $state.params.redirect && $state.params.redirect.indexOf('checkoutDetails') < 0 ? '' : 'Checkout Details';
    });
})(angular.module('vx'));
