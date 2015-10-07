(function(module) {
    'use strict';

    module.directive('whiteBox', function () {
        return {
            templateUrl: 'app/components/Common/whiteBox/whiteBox.html',
            restrict: 'E',
            transclude: true
        };
    });
    
})(angular.module('vx'));