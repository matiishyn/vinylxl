(function (module) {
    'use strict';

    module.directive('cartLink', function (Cart) {
        return {
            templateUrl: 'app/components/Main/cartLink/cartLink.html',
            restrict: 'E',
            replace: true,
            controllerAs: 'cartLink',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.cart = Cart;
            }
        };
    });

})(angular.module('vx'));