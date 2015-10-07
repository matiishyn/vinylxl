(function (module) {
    'use strict';
    module.directive('promoCarousel', function ($state) {
        return {
            templateUrl: 'app/components/Main/promoCarousel/promoCarousel.html',
            scope: {
                slides: '='
            },
            restrict: 'E',
            controllerAs: 'header',
            controller: function () {
            },
            link: function ($scope) {

                $scope.openSales = function (type, id, title) {
                    $state.go('home.products.sales', {
                        type: type,
                        id: id,
                        title: title
                    });
                };
            }
        };
    });

})(angular.module('vx'));
