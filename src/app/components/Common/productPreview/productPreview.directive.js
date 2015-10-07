(function (module) {
    'use strict';

    module.directive('productPreview', function () {
        return {
            templateUrl: 'app/components/Common/productPreview/productPreview.html',
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                editable: '='
            },
            controller: 'productPreviewCtrl',
            controllerAs: 'productPreview',
            bindToController: true
        };
    });

    module.controller('productPreviewCtrl', function (CommonMethods, $state, Wishlist, Spinner, Cart, toastr) {
        var productPreview = this;

        productPreview.getArtists = getArtists;
        productPreview.CommonMethods = CommonMethods;
        productPreview.goToProductPage = goToProductPage;

        productPreview.wishlist = {
            hover: false,
            productInWishlist: productInWishlist
        };

        // TODO Remove it, and use methods from CommonMethods
        function getArtists() {
            var result = '',
                artists = productPreview.model.artists;
            if (artists && artists.length === 1) {
                result = artists[0].name;
            } else {
                // handle multi-author
            }
            return result;
        }

        function goToProductPage() {
            $state.go('home.product', {
                id: productPreview.model._id,
                title: CommonMethods.spaceToDash(productPreview.model.title)
            });
        }

        productPreview.addToWishlist = function (e) {
            e.preventDefault();
            e.stopPropagation();
            Spinner.onPromise(Wishlist.addProduct(productPreview.model));
        };

        productPreview.addToCart = function (e) {
            e.preventDefault();
            e.stopPropagation();
            Cart.addElements(productPreview.model);
            toastr.success('The vinyl was successfully added to your Cart', 'Cart');
        };

        productPreview.removeFromWishlist = function (e) {
            e.preventDefault();
            e.stopPropagation();
            Spinner.onPromise(Wishlist.removeProduct(productPreview.model));
        };

        function productInWishlist() {
            var inWishlist;

            if (productPreview.editable) {
                inWishlist =
                    productPreview.wishlist.hover || productPreview.model.inWishlist;
            } else {
                inWishlist =
                    productPreview.wishlist.hover || productPreview.model.inWishlist || Wishlist.containsProduct(productPreview.model);
            }

            return inWishlist;
        }

        productPreview.rate = 3;
        productPreview.max = 5;
        productPreview.isReadonly = false;

        productPreview.hoveringOver = function (value) {
            productPreview.overStar = value;
            productPreview.percent = 100 * (value / productPreview.max);
        };

    });

})(angular.module('vx'));