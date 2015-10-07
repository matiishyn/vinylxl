(function (module) {
    'use strict';
    module.controller('loginConfirmationCtrl', function ($scope, Auth, profile, $state, Cart, $filter, $stateParams) {
        $scope.profile = profile;

        // USER CAN OPEN THIS PAGE ONLY AFTER LOGGING IN
        // TODO create module to check if user is logged in

        $scope.redirectState = $scope.redirectLink = $state.params.redirect;
        $scope.cartIsChanged = false;

        $scope.getUserName = getUserName;

        // save number of items in cart before merge it with server cart
        var oldCartItemsNumber = Cart.products.length,
            newCartItemsNumber;

        changeRedirectTitle();

        // try to retrieve cart
        var cartRestoring = Cart.restoreCart();

        cartRestoring.promise.then(function () {
            newCartItemsNumber = Cart.products.length;
            $scope.cartIsChanged = newCartItemsNumber !== oldCartItemsNumber;
        }).then(function () {
            // in case of redirection and cart merging change redirection to cart
            if ($scope.cartIsChanged && $stateParams.redirect) {
                $scope.redirectTimerDisabled = true; // disable timer
                $scope.redirectState = "home.cart";
                $scope.redirectTitle = $filter('translate')('cart.shoppingCartHeader');
            }
        });

        function changeRedirectTitle() {
            if ($stateParams.redirect === 'home.checkoutDetails') {
                $scope.redirectTitle = $filter('translate')('checkout.detailsHeader');
            } else if ($stateParams.redirect === 'home.cart') {
                $scope.redirectTitle = $filter('translate')('cart.shoppingCartHeader');
            }
        }

        function getUserName() {
            var name = $scope.profile.billing_address ? $scope.profile.billing_address.first_name : null;
            return name ? ', ' + name : '';
        }
    });
})(angular.module('vx'));
