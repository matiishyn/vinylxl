(function (module) {
    'use strict';
    module.filter('releaseDate', function (CONFIG) {
        return function (input) {
            return input ? moment(input, CONFIG.serverDateFormat).format(CONFIG.displayDateFormat) : '-';
        };
    });

})(angular.module('vx'));