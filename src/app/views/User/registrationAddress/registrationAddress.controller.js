/**
 * User will go to this page after confirming email address
 * with 'token' as a GET parameter
 */
(function (module) {
    'use strict';
    module.controller('RegistrationAddressCtrl', function ($scope, Auth, API_URL, Spinner, $state, $stateParams, toastr) {
        $scope.address = {};
        $scope.err = $stateParams.err && $stateParams.err !== "null" ? $stateParams.err : null;

        // if there's no username then user has come to this page manually
        // redirect to login
        if ($stateParams.token && !$scope.err) {
            Auth.setToken($stateParams.token);
            Auth.setUsername($stateParams.name);
        } else {
            !$scope.err || toastr.error($scope.err);
            goToLogin();
        }

        if (!$scope.err && $stateParams.social) {
            // check if user is already registered
            Auth.getProfile().$promise.then(function(data) {
                if (data.billing_address) {
                    goToLoginConfirmation();
                }
            });
        }

        $scope.saveUserAddress = saveUserAddress;

        function goToLogin() {
            $state.go('home.loginA');
        }

        function goToLoginConfirmation() {
            $state.go('home.loginConfirmation');
        }

        function saveUserAddress() {
            if (this.loginBForm.$valid) {
                $scope.address.email = $stateParams.name || Auth.getUsername();
                var promise = Auth.resource.updateProfile({
                    billing_address: $scope.address
                });
                Spinner.onPromise(promise);

                promise.$promise.then(function () {
                    // update variable
                    Auth.profile = promise;
                    $state.go('home.thanksForRegistration', {redirect: $state.params.redirect});
                });
            } else {
                this.loginBForm.showValidation = true;
            }
        }

    });

})(angular.module('vx'));
