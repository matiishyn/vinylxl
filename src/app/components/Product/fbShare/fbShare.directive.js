// based on https://developers.facebook.com/docs/plugins/share-button
(function (module) {
    'use strict';
    module.directive('fbShare', function () {
        return {
            templateUrl: 'app/components/Product/fbShare/fbShare.html',
            restrict: 'E',
            scope: {
                url: '@',
                description: '@',
                image: '@',
                title: '@'
            },
            link: function ($scope, $element) {
                var metaTags = '';
                if ($scope.url) {
                    metaTags += '<meta property="og:url" content="' + $scope.url + '" />';
                }
                metaTags += '<meta property="og:type" content="website" />';
                if ($scope.title) {
                    metaTags += '<meta property="og:title" content="' + $scope.title + '" />';
                }
                if ($scope.description) {
                    metaTags += '<meta property="og:description" content="' + $scope.description + '" />';
                }
                if ($scope.image) {
                    metaTags += '<meta property="og:image" content="' + $scope.image + '" />';
                }
            }
        };
    });
})(angular.module('vx'));