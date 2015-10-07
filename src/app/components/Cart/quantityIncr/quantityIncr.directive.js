(function (module) {
    'use strict';

    module.directive('quantityIncr', function (Cart) {
        return {
            templateUrl: 'app/components/Cart/quantityIncr/quantityIncr.html',
            restrict: 'E',
            scope: {
                product: '='
            },
            controllerAs: 'quantityIncr',
            bindToController: true,
            controller: function ($scope) {
                var vm = this;

                vm.decrementQuantity = decrementQuantity;
                vm.incrementQuantity = incrementQuantity;

                vm.inputModel = vm.product.quantity;

                // change inner model when product quantity changes
                /*$scope.$watch('quantityIncr.product.quantity', function (newVal, oldVal) {
                    if(newVal && newVal !== oldVal) {
                        vm.inputModel = newVal;
                    }
                });*/

                // when user change quantity manually typing inside input
                $scope.$watch('quantityIncr.inputModel', function (newVal, oldVal) {
                    if (parseInt(newVal) && parseInt(oldVal) && newVal !== oldVal) {
                        Cart.setQuantity(vm.product, newVal);
                    }
                });

                function decrementQuantity() {
                    if (vm.inputModel > 1) {
                        vm.inputModel--;
                    }
                }

                function incrementQuantity() {
                    vm.inputModel++;
                }
            }
        };
    });

})(angular.module('vx'));