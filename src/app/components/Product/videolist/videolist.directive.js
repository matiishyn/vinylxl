(function (module) {
    'use strict';

    module.directive('videolist', function () {
        return {
            templateUrl: 'app/components/Product/videolist/videolist.html',
            restrict: 'E',
            scope: {
                videos: '='
            }
        };
    });

})(angular.module('vx'));