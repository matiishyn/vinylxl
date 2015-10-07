// based on https://about.twitter.com/cs/resources/buttons#tweet
(function (module) {
    'use strict';
    module.directive('twitterShare', function () {
        return {
            templateUrl: 'app/components/Product/twitterShare/twitterShare.html',
            restrict: 'E'
        };
    });
})(angular.module('vx'));