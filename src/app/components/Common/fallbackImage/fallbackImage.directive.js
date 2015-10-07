(function (module) {
    'use strict';

    module.directive('fallbackImage', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('error', function () {
                    this.src = 'assets/ui/default-release.png';
                });
            }
        };
    });


})(angular.module('vx'));