(function (module) {
    'use strict';

    module.directive('redirectTimer', function ($interval, $state) {
        return {
            templateUrl: 'app/components/Common/redirectTimer/redirectTimer.html',
            restrict: 'E',
            scope: {
                redirectState: '=',
                redirectTitle: '=',
                disabled: '='
            },
            link: function (scope) {
                scope.number = 5;
                var intPromise;

                if (scope.redirectState) {
                    intPromise = $interval(redirect, 1000);
                }

                function redirect() {
                    if (scope.disabled) {
                        $interval.cancel(intPromise);
                    } else if (scope.number <= 1) {
                        $interval.cancel(intPromise);

                        if (scope.redirectState) {
                            $state.go(scope.redirectState);
                        }
                    } else {
                        scope.number--;
                    }
                }

            }
        };
    });


})(angular.module('vx'));