(function(module) {
    'use strict';

    module.directive('loginLink', function (Auth, $state) {
        return {
            templateUrl: 'app/components/User/loginLink/loginLink.html',
            restrict: 'E',
            replace: true,
            controllerAs: 'loginLink',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.Auth = Auth;

                Auth.autoLogin();

                vm.logout = logout;

                function logout() {
                    Auth.logout();
                    $state.go('home');
                }
            }
        };
    });
    
})(angular.module('vx'));