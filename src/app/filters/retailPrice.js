(function (module) {
    'use strict';

    module.filter('retailPrice', function () {
        return function (input) {
            return input / 100;
        };
    });

})(angular.module('vx'));