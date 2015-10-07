(function (module) {
    'use strict';

    module.controller('CartCtrl', function ($scope, Cart, CommonMethods, Auth, $state, Customer) {
        // update shipping cost
        Customer.updateOrder();

        $scope.cart = Cart;
        $scope.userIsLoggedIn = Auth.getToken();
        $scope.CommonMethods = CommonMethods;

        $scope.termsCheckbox = !!Auth.getToken();
        $scope.proceed = proceed;
        $scope.openTerms = openTerms;

        function proceed() {
            // if user is not logged in then go to login page
            // else go to address page
            if(Auth.getToken()) {
                $state.go('home.checkoutDetails');
            } else {
                $state.go('home.loginA', {redirect: 'home.checkoutDetails'});
            }
        }

        function openTerms() {
            CommonMethods.openTermsModal().result.then(function() {
                $scope.termsCheckbox = true;
            });
        }

        // every time subtotal is being changed update order info
        $scope.$watch('cart.subtotal', function(newVal, oldVal) {
            if(newVal && newVal !== oldVal) {
                Customer.updateOrder();
            }
        });
    });

})(angular.module('vx'));
