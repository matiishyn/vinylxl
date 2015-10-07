(function(module) {
    'use strict';

    module.directive('signUp', function (News, Spinner, toastr, $filter) {
        return {
            templateUrl: 'app/components/Main/signUp/signUp.html',
            restrict: 'E',
            controllerAs: 'signUp',
            controller: function($scope) {
                var vm = this;

                vm.email = '';

                vm.subscribe = function() {
                    if($scope.signUpForm.$valid) {
                        var promise = News.subscribe(vm.email);
                        Spinner.onPromise(promise);
                        promise.then(function() {
                            toastr.success($filter('translate')('infoMsgs.signUpSuccess'));
                        });
                    }
                };
            }
        };
    });
    
})(angular.module('vx'));