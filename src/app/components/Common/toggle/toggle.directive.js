(function(module) {
    'use strict';

    module.directive('toggle', function() {
        return {
            templateUrl: 'app/components/Common/toggle/toggle.html',
            restrict: 'E',
            replace: true,
            scope: {
                title: '=',
                previous: '&',
                next: '&',
                disable: '='
            },
            controller: 'toggleCtrl',
            controllerAs: 'toggle',
            bindToController: true
        };
    });

    module.controller('toggleCtrl', function () {});

})(angular.module('vx'));