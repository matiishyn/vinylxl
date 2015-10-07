(function (module) {
    'use strict';

    module.directive('filterLabel', function () {

        return {
            templateUrl: 'app/components/Product/filterLabel/filterLabel.html',
            restrict: 'E',
            transclude: true
        };
    });

})(angular.module('vx'));