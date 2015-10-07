(function(module) {
    'use strict';

    module.directive('couponDiscount', function (Customer) {
        return {
            templateUrl: 'app/components/Cart/couponDiscount/couponDiscount.html',
            restrict: 'E',
            scope: {
                model: '='
            },
            controllerAs: 'couponDiscount',
            bindToController: true,
            controller: function() {
                var vm = this;
                vm.applyCoupon = Customer.updateOrder;
            }
        };
    });
    
})(angular.module('vx'));