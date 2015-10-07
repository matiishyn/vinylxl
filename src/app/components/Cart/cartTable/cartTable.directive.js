(function(module) {
    'use strict';

    module.directive('cartTable', function (Cart, CommonMethods) {
        return {
            templateUrl: 'app/components/Cart/cartTable/cartTable.html',
            restrict: 'E',
            scope: {
                readonly: '=?'
            },
            controllerAs: 'cartTable',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.cart = Cart;
                vm.commonMethods = CommonMethods;
            }
        };
    });
    
})(angular.module('vx'));