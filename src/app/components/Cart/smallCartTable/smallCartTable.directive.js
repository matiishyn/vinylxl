(function(module) {
    'use strict';

    module.directive('smallCartTable', function (Cart, CommonMethods) {
        return {
            templateUrl: 'app/components/Cart/smallCartTable/smallCartTable.html',
            restrict: 'E',
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