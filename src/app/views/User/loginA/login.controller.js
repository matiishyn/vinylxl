(function (module) {
    'use strict';
    module.controller('LoginCtrl', function ($scope, $element, Auth, Spinner, $state, $window, API_URL, Password, $translate) {
        $scope.login = login;
        $scope.signup = signup;
        $scope.restorePass = restorePass;

        $scope.registrationViaGoogle = registrationViaGoogle;
        $scope.registrationViaFacebook = registrationViaFacebook;

        $scope.flipRestorePassAndLogin = flipRestorePassAndLogin;

        $scope.loginFormData = {
            email: '',
            password: '',
            rememberMe: false
        };
        $scope.signupFormData = {
            email: '',
            password: ''
        };

        /**
         * on press SIGN IN button
         * go to loginConfirmation after successful login
         */
        function login() {
            this.signInForm.showValidation = true;

            var email = $scope.loginFormData.email || '';
            email = email.trim();
            var password = $scope.loginFormData.password || '';
            password = password.trim();

            if (this.signInForm.$valid && email && password) {
                var promise = Auth.login(email, password, $scope.loginFormData.rememberMe);
                Spinner.onPromise(promise);
                promise.$promise.then(goToConfirmation);
            }
        }

        function restorePass() {
            this.signInForm.showValidation = true;

            var email = $scope.loginFormData.email.trim() || '',
                lang = $translate.use() || 'en';

            if (this.signInForm.$valid && email) {
                // form's valid, send request
                var promise = Password.restore(email, lang);
                Spinner.onPromise(promise);
                promise.then(function () {
                    // Email was sent
                    $element.find('.restore-password-container').addClass('email-sent');
                });

            }
        }

        function signup() {
            this.signInForm.showValidation = true;

            var email = $scope.loginFormData.email || '';
            email = email.trim();
            var password = $scope.loginFormData.password || '';
            password = password.trim();

            if (this.signInForm.$valid && email && password) {
                var promise = Auth.signup(email, password);
                Spinner.onPromise(promise);
                promise.$promise.then(goToRegister1Page);
            }
        }

        /**
         * After login user can be redirected somewhere else
         */
        function goToConfirmation() {
            $state.go('home.loginConfirmation', {redirect: $state.params.redirect});
        }

        function goToRegister1Page() {
            $state.go('home.registrationEmailWasSent');
        }

        //todo
        function registrationViaGoogle() {
            $window.location.href = API_URL + 'auth/google?state=' + $window.location.origin +
                '/registration/address?expires={{expires}}&token={{token}}&name={{username}}&err={{err}}&social=true';
        }

        function registrationViaFacebook() {
            $window.location.href = API_URL + 'auth/facebook?state=' + $window.location.origin +
                '/registration/address?expires={{expires}}&token={{token}}&name={{username}}&err={{err}}&social=true';
        }

        function flipRestorePassAndLogin() {
            $element.find('.flip-container').toggleClass('hover');
        }

    });

})(angular.module('vx'));
