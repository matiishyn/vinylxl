(function (module) {
    'use strict';
    module.directive('cartTotalTable', function (Cart, CommonMethods) {
        return {
            templateUrl: 'app/components/Cart/cartTotalTable/cartTotalTable.html',
            restrict: 'E',
            scope: {
                total: '=',
                shipping: '='
            },
            controllerAs: 'cartTotalTable',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.cart = Cart;
                vm.commonMethods = CommonMethods;
            }
        };
    });
})(angular.module('vx'));