(function (module) {
    'use strict';

    module.factory('FiltersService', function () {
        var Filters = {
            filterObj: {},
            filterStr: {}
        };

        return Filters;
    });

})(angular.module('vx'));
