(function (module) {
    'use strict';
    module.controller('restorePasswordCtrl', function ($scope, Password, $stateParams, Spinner, $translate, $filter, $state, toastr) {
        // check if recoveryToken is correct
        var recoveryToken = $stateParams.recoveryToken;

        $scope.changePassword = changePassword;
        $scope.restorePasswordFormData = {};

        if (recoveryToken) {
            var promise = Password.checkRecoveryToken(recoveryToken);
            Spinner.onPromise(promise);
            promise.then(function (response) {
                if (response && response.data) {

                } else {
                    goToLogin();
                }
            }, /* in case of error */ goToLogin);
        } else {
            goToLogin();
        }

        function goToLogin() {
            $state.go('home.loginA');
        }

        function changePassword() {
            this.restorePasswordForm.showValidation = true;

            var pass = $scope.restorePasswordFormData.password.trim() || '';
            var repeatedPass = $scope.restorePasswordFormData.repeatPassword.trim() || '';
            var lang = $translate.use() || 'en';

            if (this.restorePasswordForm.$valid && pass && repeatedPass === pass) {
                // form's valid, send request
                var promise = Password.changePassword(recoveryToken, pass, lang);
                Spinner.onPromise(promise);
                promise.then(function () {
                    $state.go('home.loginA');
                    toastr.success($filter('translate')('restorePass.changedMsg'));
                });

            }
        }
    });
})(angular.module('vx'));