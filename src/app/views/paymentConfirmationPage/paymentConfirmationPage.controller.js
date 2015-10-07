(function (module) {
    'use strict';

    module.controller('PaymentConfirmationPageCtrl', function ($scope, Cart, $stateParams, $state) {

        // clean cart only if payment was successful
        if($state.params.orderStatusId === '100') {
            Cart.clear();
        }
        $scope.paymentStatus = $stateParams.orderStatusId;
    });

})(angular.module('vx'));
