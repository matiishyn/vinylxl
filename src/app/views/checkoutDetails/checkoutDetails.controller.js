(function (module) {
    'use strict';

    module.controller('CheckoutDetailsCtrl', function ($scope, $state, Customer, Spinner, PaymentService, Auth, Cart, $modal) {
        // update shipping cost
        Customer.updateOrder();

        $scope.saveAddressAndGoToPayment = saveAddressAndGoToPayment;

        $scope.token = Auth.getToken();
        $scope.userAddress = !$scope.token || Auth.getProfile();
        $scope.shippingAddress = {};
        $scope.openAccountDetailsModal = openAccountDetailsModal;

        $scope.model = {
            selectedInvoiceAddress: Auth.getToken() ? 'invoice' : '', // pre-selected radio button
            couponeCode: '',
            cart: Cart
        };

        // clear payment methods in case of step back
        PaymentService.clearMethods();

        function saveAddressAndGoToPayment(form) {
            if (form.$valid || $scope.model.selectedInvoiceAddress === 'invoice') {
                var promise = Customer.saveAddress(getBillingAdr(), getShippingAdr(), $scope.model.couponeCode);
                Spinner.onPromise(promise);
                promise.$promise.then(function (data) {
                    $state.go('home.payment', {
                        order_id: data._id,
                        selectedCountry: getShippingAdr().country,
                        token: data.access_token
                    });
                });
            } else {
                form.showValidation = true;
            }

        }

        function getBillingAdr() {
            var adr = {};
            if (Auth.getToken()) {
                adr = Auth.profile.billing_address;
            } else {
                adr = $scope.shippingAddress;
            }
            return adr;
        }

        function getShippingAdr() {
            var adr = {};
            if (Auth.getToken() && $scope.model.selectedInvoiceAddress === 'invoice') { // todo $scope.model.selectedInvoiceAddress is not working
                adr = Auth.profile.billing_address;
            } else {
                adr = $scope.shippingAddress;
            }
            return adr;
        }

        function openAccountDetailsModal() {
            $modal.open({
                templateUrl: 'app/views/User/personalInfo/editInfoModal.html',
                controller: 'editInfoModalCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    address: function () {
                        return $scope.userAddress.billing_address;
                    }
                }
            });
        }
    });

})(angular.module('vx'));
