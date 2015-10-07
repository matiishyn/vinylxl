(function(module) {
    'use strict';

    module.directive('similarProducts', function (ProductsService, Spinner) {
        return {
            templateUrl: 'app/components/Product/similarProducts/similarProducts.html',
            restrict: 'E',
            scope: {
                productId: '@'
            },
            controllerAs: 'similarProducts',
            bindToController: true,
            controller: function() {
                var vm = this;
                vm.products = ProductsService.related( { productId: vm.productId, limit: 6 });
                Spinner.onPromise(vm.products);
            }
        };
    });
    
})(angular.module('vx'));