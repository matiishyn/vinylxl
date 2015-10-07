(function (module) {
    'use strict';

    module.directive('orderHistoryTable', function (Spinner, Customer, ProductsService, CommonMethods) {
        return {
            templateUrl: 'app/components/User/orderHistoryTable/orderHistoryTable.html',
            restrict: 'E',
            scope: {
                orders: '='
            },
            controllerAs: 'orderHistoryTable',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.CommonMethods = CommonMethods;
                vm.expandOrder = expandOrder;
                vm.orderInfo = {};
                vm.orderProducts = [];


                function expandOrder(id, event) {
                    // slideUp all others
                    $('.expanded-section').slideUp(200);
                    $('.row-highlighted').removeClass('row-highlighted');

                    var promise = Customer.resource.get({id: id});
                    Spinner.start();
                    vm.orderInfo = promise;

                    promise.$promise.then(onOrderDataReady.bind(this, event.currentTarget));
                }

                function onOrderDataReady(currentTarget, response) {
                    // slideDown current
                    $(currentTarget)
                        .parent().addClass('row-highlighted').end()
                        .next().slideDown();

                    // clean array
                    vm.orderProducts = [];

                    // transform object from response to array with objects with quantity
                    response.order_items.forEach(function (product) {
                        var existingElementIndex = _.findIndex(vm.orderProducts, {"product_id": product.product_id});
                        if (existingElementIndex >= 0) {
                            // found element, increase quantity
                            vm.orderProducts[existingElementIndex].quantity += 1;
                        } else {
                            // not found, push new product
                            product.quantity = 1;
                            vm.orderProducts.push(product);
                        }
                    });

                    // get product detailed info
                    vm.orderProducts.forEach(function (product, index, array) {
                        var quantity = product.quantity;
                        var boughtPrice = product.price; // need to save the real price that customer bought the product
                        var productInfo = ProductsService.query({
                            "_q": "product_id",
                            "_a": "pid",
                            "pid:eq": product.product_id
                        });
                        Spinner.start();
                        productInfo.$promise.then(function (response) {
                            response[0].quantity = quantity;
                            response[0].boughtPrice = boughtPrice;
                            Spinner.stopAll();
                        });
                        array[index] = productInfo;
                    });
                }
            }
        };
    });

})(angular.module('vx'));