(function (module) {
    'use strict';

    module.factory('PaymentService', function ($resource, API_URL, FE_URL, $window) {

        var resource = $resource(API_URL + 'payment/', {}, {
            getServices: {
                url: API_URL + 'payment/service',
                method: 'GET'
            },
            start: {
                url: API_URL + 'payment/start',
                method: 'POST'
            }
        });

        var Payment = {
            resource: resource,
            start: function (orderId) {
                var promise = this.resource.start({
                    "finishUrl": FE_URL + 'checkout/payment-confirmation',// resp ?orderId=536394448Xfe03c2&orderStatusId=100&paymentSessionId=536394448
                    "paymentOptionId": this.chosenPaymentMethod.paymentOptionId,
                    "paymentOptionSubId": this.chosenPaymentMethod.paymentOptionSubId,
                    "orderId": orderId
                });
                promise.$promise.then(function (data) {
                    $window.location = data.transaction.paymentURL;
                });
                return promise;
            },
            clearMethods: clearMethods,
            chosenPaymentMethod: {
                //paymentOptionId: null,
                //paymentOptionSubId: null
            }
        };

        function clearMethods() {
            this.chosenPaymentMethod.paymentOptionId = null;
            this.chosenPaymentMethod.paymentOptionSubId = null;
        }

        return Payment;

        /*

         orderStatusId=-80 Payment expired.
         orderStatusId=-90 Payment cancelled.
         orderStatusId=100 Payment successful.

         */
    });

})(angular.module('vx'));
