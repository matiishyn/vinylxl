(function (module) {
    'use strict';

    module.factory('Wishlist', function (WL_NAME, $q, $window, toastr, $resource, API_URL) {
        var resource = $resource(API_URL + 'wishlist/', {}, {
            remove: {
                url: API_URL + 'wishlist/:productId',
                method: 'DELETE'
            }
        });

        return {
            isAuth: false,
            getProducts: function () {
                if (this.isAuth) {
                    return resource.query().$promise.then(function (products) {
                        this.products = _.map(products, function (product) {
                            product.inWishlist = true;
                            return product;
                        });
                        return this.products;
                    }.bind(this));
                }

                return $q.when(JSON.parse($window.localStorage.getItem(WL_NAME)) || []).then(function (products) {
                    return this.products = products;
                }.bind(this));
            },
            setProducts: function (products) {
                if (this.isAuth) {
                    products = _.map(products, function (product) {
                        return product.product_id;
                    });

                    return resource.save(products).$promise;
                }

                $window.localStorage.setItem(WL_NAME, JSON.stringify(products));
                return $q.when(products);
            },
            addProduct: function (product) {
                if (!product) {
                    return;
                }

                if (product.inWishlist) {
                    return;
                }

                product.inWishlist = true;

                var products = _.union(this.products, [product]);

                return this.setProducts(products).then(function () {
                    toastr.success('The vinyl was successfully added', 'Wishlist');
                });
            },
            removeProduct: function (product) {
                if (this.isAuth) {
                    return resource.remove({productId: product.product_id}).$promise.then(function () {
                        product.inWishlist = false;
                    });
                }

                var products = this.removeFromCurrent(product);
                product.inWishlist = false;
                return this.setProducts(products);
            },
            removeFromCurrent: function (product) {
                return _.reject(this.products, function (wishlistProduct) {
                    return wishlistProduct.product_id === product.product_id;
                });
            },
            containsProduct: function (product) {
                return _.findWhere(this.products, {product_id: product.product_id});
            }
        };

    });

})(angular.module('vx'));
