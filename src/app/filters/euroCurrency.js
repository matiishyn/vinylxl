(function (module) {
    'use strict';
    // US $ 1,199.99 => EURO ˆ1199,99
    module.filter('euroCurrency', function () {
        return function (input) {
            // remove commas
            var newValue = input.replace(/,/g,'');
            // put comma instead of dot
            newValue = newValue.replace(/\./g,',');

            return newValue;
        };
    });
})(angular.module('vx'));