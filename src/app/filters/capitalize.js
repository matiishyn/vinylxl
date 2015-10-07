(function(module) {
    'use strict';
    // Capitalize the first letter of a sentence
    module.filter('capitalize', function () {
        return function (input) {
            if (!input) {
                return input;
            }
        
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        };
    });
    
})(angular.module('vx'));