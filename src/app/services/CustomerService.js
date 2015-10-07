(function (module) {
    'use strict';

    /**
     POST /customer-orders

     {
       "customer": {
         "billing_address": { },
         "shipping_address": { }
       },
       "order_items": [ ]
     }
     */

    module.factory('Customer', function ($resource, API_URL, Cart, TOKEN_HEADER) {

        var Customer = {
            orderId: null, // will be filled
            address: {
                "salutation": "",
                "first_name": "",
                "last_name": "",
                "address": "",
                "house": "",
                "number": "",
                "postal_code": "",
                "city": "",
                "country": "",
                "email": ""
            }
        };

        var customerOrderResource = $resource(API_URL + 'customer-orders/:id', {}, {
            orderPreview: {
                url: API_URL + 'customer-orders/preview',
                method: 'POST'
            }
        });

        Customer.saveAddress = saveAddress;
        Customer.updateOrder = updateOrder;
        Customer.getOrderById = getOrderById;
        Customer.resource = customerOrderResource;

        /**
         * Used to update current order, get latest numbers for discount by coupon and shipping cost
         * @param couponCode{string}
         */
        function updateOrder(couponCode) {
            return customerOrderResource.orderPreview({
                "customer": {},
                coupon_code: couponCode || '',
                order_items: Cart.getProductsForCheckout()
            })
                .$promise
                .then(function (data) {
                    // set new values to Cart
                    Cart.setShippingPrice(data.shipping);
                    Cart.setTotal(data.total);
                    // TODO apply coupon discount here
//                    Cart.setCouponDiscount(data.shipping);
                });
        }

        function saveAddress(billingAdr, shippingAdr, couponCode) {
            var me = this;
            var promise = customerOrderResource.save({
                "customer": {
                    "billing_address": billingAdr,
                    shipping_address: shippingAdr
                },
                coupon_code: couponCode, // 'code'
                order_items: Cart.getProductsForCheckout()
            });

            promise.$promise.then(function (response) {
                me.orderId = response._id;
            });

            return promise;
        }

        function getOrderById(token) {
            var headers = {};
            headers[TOKEN_HEADER] = token;

            return $resource(API_URL + 'customer-orders/:id', null, {
                get: {
                    headers: headers
                }
            });
        }

        return Customer;

    });

})(angular.module('vx'));
