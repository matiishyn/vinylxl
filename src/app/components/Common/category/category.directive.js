(function(module) {
    'use strict';

    module.directive('category', function() {
        return {
            templateUrl: 'app/components/Common/category/category.html',
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                model: '=',
                products: '=',
                goToProducts: '&'
            },
            controller: 'categoryCtrl',
            controllerAs: 'category',
            bindToController: true
        };
    });

    module.controller('categoryCtrl', function () {});

})(angular.module('vx'));