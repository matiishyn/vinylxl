(function (module) {
    'use strict';
    module.filter('trustAsResourceUrl', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    });
})(angular.module('vx'));