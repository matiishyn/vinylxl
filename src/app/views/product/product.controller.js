(function (module) {
    'use strict';

    module.controller('ProductCtrl', function ($scope, $stateParams, product, Cart, Spinner, $timeout, Wishlist, $window, CommonMethods) {
        // scroll to top
        $window.scrollTo(0,0);

        $scope.productId = $stateParams.id;

        $scope.product = product;
        $scope.addToCart = addToCart;
        $scope.isProductInWishlist = isProductInWishlist;
        $scope.addToWishlist = addToWishlist;
        $scope.removeFromWishlist = removeFromWishlist;
        $scope.addRemoveToWishlist = addRemoveToWishlist;

        $scope.sharingInfo = {
            url: $window.location.href
        };

        $scope.CommonMethods = CommonMethods;

        Spinner.onPromise($scope.product);

        function addToCart() {
            // todo temp not-optimized solution of animation
            Cart.addElements(product);
            $('#add-to-cart-btn').addClass('adding-to-cart');
            $timeout(function() {
                $('#add-to-cart-btn').removeClass('adding-to-cart');
            }, 2000);
        }

        function isProductInWishlist() {
            return typeof product.inWishlist === "undefined" ? Wishlist.containsProduct($scope.product) : product.inWishlist;
        }

        function addToWishlist() {
            Spinner.onPromise(Wishlist.addProduct($scope.product));
        }

        function removeFromWishlist() {
            Spinner.onPromise(Wishlist.removeProduct($scope.product));
        }

        function addRemoveToWishlist() {
            if (isProductInWishlist()) {
                removeFromWishlist();
            } else {
                addToWishlist();
            }
        }
    });

})(angular.module('vx'));
