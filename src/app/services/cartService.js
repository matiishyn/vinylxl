/**
 * Cart service is used to store items inside User's cart
 */
(function (module) {
    'use strict';

    module.factory('Cart', function ($window, LS_OBJECT_NAME, $http, Auth, API_URL, $q) {

        var Cart = {
            products: [],
            subtotal: 0,        // sum of all products prices
            total: 0,           // subtotal + shipping - coupon
            shippingPrice: 0,   // price for shipping
            couponDiscount: 0   // amount that coupon allows to be reduced
        };

        var CartServer = {
            addItem: function (productId) {
                return $http({
                    method: 'put',
                    url: API_URL + 'cart/' + productId,
                    data: {quantity: 1}
                });
            },
            setQuantity: function (productId, quantity) {
                return $http({
                    method: 'put',
                    url: API_URL + 'cart/' + productId,
                    data: {quantity: quantity}
                });
            },
            // get all items from cart
            restore: function () {
                return $http({
                    method: 'get',
                    url: API_URL + 'cart'
                });
            },
            convertToLocalView: function (cart) {
                return _.map(cart, function (item) {
                    return _.extend(item.product, {quantity: item.quantity});
                });
            },
            deleteProduct: function (productId) {
                return $http({
                    method: 'delete',
                    url: API_URL + 'cart/' + productId
                });
            }
        };

        /**
         *  In LocalStorage
         * [ {
         *      ... product info ...,
         *      quantity: <number>
         * } ]
         *
         *  On Server
         * [{
         *      product: {},
         *      quantity: <number>
         * }]
         */

        Cart.addElements = addElements;
        Cart.removeProduct = removeProduct;
        Cart.addElementToCart = addElementToCart;
        Cart.setQuantity = setQuantity;
        Cart.saveCart = saveCart;
        Cart.setShippingPrice = setShippingPrice;
        Cart.setCouponDiscount = setCouponDiscount;
        Cart.setTotal = setTotal;
        Cart.setSubtotal = setSubtotal;
        Cart.restoreCart = restoreCart;
        Cart.getNumberOfProducts = getNumberOfProducts;
        Cart.getProducts = getProducts;
        Cart.getProductsForCheckout = getProductsForCheckout;
        Cart.clear = clear;

        /**
         *
         * @param items {object} - whole product object
         */
        function addElements(items) {
            var me = this;
            if (Array.isArray(items)) {
                items.forEach(function (item) {
                    me.addElementToCart(item);
                });
            } else {
                this.addElementToCart(items);

                // if user is logged in then add item to server
                if (Auth.getToken()) {
                    CartServer.addItem(items.product_id);
                }

                this.saveCart();
            }
        }

        function setShippingPrice(newValue) {
            this.shippingPrice = newValue;
        }

        function setCouponDiscount(newValue) {
            this.couponDiscount = newValue;
        }

        function setTotal(newValue) {
            this.total = newValue;
        }

        function setSubtotal(newValue) {
            this.subtotal = newValue;
        }

        // save cart in localStorage
        function saveCart() {
            $window.localStorage.setItem(LS_OBJECT_NAME, JSON.stringify(this.products));
        }

        function restoreCart() {
            var me = this,
                result = $q.defer();
            if (Auth.getToken()) {
                // if user is logged in then restoring cart from server
                CartServer.restore().then(function (response) {
                    var restoredProducts = CartServer.convertToLocalView(response.data);

                    // merge received cart with current cart
                    me.addElements(restoredProducts);

                    // save cart in LS
                    me.saveCart();

                    result.resolve();
                });
            } else {
                // else save cart in localStorage
                this.products = JSON.parse($window.localStorage.getItem(LS_OBJECT_NAME)) || [];
                result.resolve();
            }
            return result;
        }

        // no need
        /*function getProductsFromServer() {
         ProductsService.query({
         "_q": "_id",
         "_a": "id",
         "id:in": this.model.products.join(",")
         });
         }*/

        function addElementToCart(product) {
            var existingElementIndex = _.findIndex(this.products, {"_id": product._id});
            if (existingElementIndex >= 0) {
                // found element, increase quantity
                this.products[existingElementIndex].quantity += 1;
            } else {
                // not found, push new product
                product.quantity = product.quantity || 1;
                product.price = product.retail_price;
                this.products.push(product);
            }
        }

        function getNumberOfProducts() {
            var n = 0,
                me = this;
            me.subtotal = 0;

            this.products.forEach(function (product) {
                n += product.quantity;
                me.subtotal += product.retail_price * product.quantity;
            });

            return n;
        }


        // https://api.vinylxl.nl/api/v1.0/products?
        // _q=_id,title,product_id&
        // _a=id,t,pid&
        // id:in=558077822b0124c7259b8c8d,558077762b0124c7259b6a83,558077822b0124c7259b8c8d


        // Customer service expects for format:
        /*
         "order_items": [
         { "product_id","distr_prod_id","quantity","price","retail_price" }
         ]
         */
        function getProducts() {
            return this.products;
        }

        /**
         * An array with products should be returned without 'quantity'
         * if in Cart we have one product with quantity = 3
         * then 3 separate products should be returned
         */
        function getProductsForCheckout() {
            var result = [];

            this.products.forEach(function (product) {
                for (var i = 1, l = product.quantity; i <= l; i++) {
                    result.push(product);
                }
            });

            return result;
        }


        function clear() {
            this.products = [];
            $window.localStorage.removeItem(LS_OBJECT_NAME);
        }

        function removeProduct(product) {
            var elIndex = _.findIndex(this.products, {'_id': product._id});
            if (elIndex >= 0) {
                this.products.splice(elIndex, 1);
                this.saveCart();

                if (Auth.getToken()) {
                    CartServer.setQuantity(product.product_id, 0);
                }
            }
        }

        function setQuantity(product, quantity) {
            var result = $q.defer();
            var existingElementIndex = _.findIndex(this.products, {"_id": product._id});
            // set quantity
            this.products[existingElementIndex].quantity = quantity;
            // save cart in LS
            this.saveCart();
            // if user is logged in then set quantity on server cart
            if (Auth.getToken()) {
                result = CartServer.setQuantity(product.product_id, quantity);
            } else {
                result.resolve();
            }

            return result;
        }


        return Cart;
    });

})(angular.module('vx'));
