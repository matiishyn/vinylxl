(function (module) {
    'use strict';

    module.controller('WishlistCtrl', function (Wishlist, Spinner) {
        var wishlist = this;

        getProducts();

        wishlist.editMode = false;

        wishlist.toggleEditMode = function () {
            wishlist.editMode = !wishlist.editMode;

            if (wishlist.editMode === false) {
                getProducts();
            }
        };

        function getProducts () {
            Spinner.onPromise(Wishlist.getProducts().then(function (products) {
                wishlist.products = products;
            }));
        }
    });

})(angular.module('vx'));
