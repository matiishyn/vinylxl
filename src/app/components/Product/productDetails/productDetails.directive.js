(function(module) {
    'use strict';

    module.directive('productDetails', function (CommonMethods) {
        return {
            templateUrl: 'app/components/Product/productDetails/productDetails.html',
            restrict: 'E',
            scope: {
                product: '='
            },
            controllerAs: 'productDetails',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.CommonMethods = CommonMethods;
            }
        };
    });
    
})(angular.module('vx'));