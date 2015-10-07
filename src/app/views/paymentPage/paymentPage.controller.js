(function (module) {
    'use strict';

    module.controller('PaymentPageCtrl', function ($scope, PaymentService, Spinner, Customer, $state, Order) {

        $scope.vm = {
            order: Order
        };

        $scope.placeOrder = placeOrder;

        $scope.selectedCountryForPayment = $state.params.selectedCountry;

        function placeOrder() {
            Spinner.onPromise(PaymentService.start($state.params.order_id));
        }
});

})(angular.module('vx'));
