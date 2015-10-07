(function (module) {
    'use strict';
    module.filter('country', function ($filter) {
        return function (input) {
            return $filter('translate')('checkout.countries.' + input);
        };
    });

})(angular.module('vx'));