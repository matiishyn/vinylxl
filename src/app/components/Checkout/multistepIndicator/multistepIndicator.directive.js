(function (module) {
    'use strict';

    module.directive('multistepIndicator', function () {
        return {
            templateUrl: 'app/components/Checkout/multistepIndicator/multistepIndicator.html',
            restrict: 'E',
            scope: {
                currentStep: '@'
            },
            controllerAs: 'indCtrl',
            bindToController: true,
            controller: function () {},
            link: function (scope, element) {
                element.find('li')
                    .eq(scope.indCtrl.currentStep).addClass('current')
                    .nextAll().addClass('disabled');
            }
        };
    });

})(angular.module('vx'));