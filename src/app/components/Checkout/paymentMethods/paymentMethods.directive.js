(function(module) {
    'use strict';

    module.directive('paymentMethods', function (PaymentService, Customer, Spinner) {
        return {
            templateUrl: 'app/components/Checkout/paymentMethods/paymentMethods.html',
            restrict: 'E',
            scope: {
                selectedCountry: '@'
            },
            controllerAs: 'paymentMethodsCtrl',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.getSubOptionsList = getSubOptionsList;
                vm.getSubOptionsNumber = getSubOptionsNumber;

                vm.selectFirstSubOption = selectFirstSubOption;

                vm.paymentService = PaymentService;
                vm.paymentOptions = vm.paymentService.resource.getServices().$promise.then(transformResponse);

                Spinner.onPromise(vm.paymentOptions);

                /**
                 * Merge all options into one object.
                 * @param response
                 */
                function transformResponse(response) {
                    if (response.countryOptionList && response.countryOptionList.ALL) {
                        var countryList = response.countryOptionList[vm.selectedCountry] ?
                            response.countryOptionList[vm.selectedCountry].paymentOptionList : {};
                        vm.paymentOptions = _.extend(countryList, response.countryOptionList.ALL.paymentOptionList);

                        // requirement - check first option after they are loaded
                        // WORKAROUND until we know available options
                        var selectedId = Object.keys(vm.paymentOptions)[0];
                        vm.paymentService.chosenPaymentMethod.paymentOptionId = selectedId;
                        // and subOption, if exists
                        var selectedObj = vm.paymentOptions[selectedId];
                        if(selectedObj.paymentOptionSubList) {
                            vm.paymentService.chosenPaymentMethod.paymentOptionSubId = Object.keys(selectedObj.paymentOptionSubList)[0];
                        }
                    } else {
                        vm.paymentOptions = {};
                    }
                }

                function getSubOptionsList() {
                    if (!vm.paymentOptions["$$state"]) {
                        var selected = vm.paymentOptions[vm.paymentService.chosenPaymentMethod.paymentOptionId];
                        return selected ? selected.paymentOptionSubList : {};
                    }
                }

                function getSubOptionsNumber() {
                    var obj = getSubOptionsList() || {};
                    return Object.keys(obj).length;
                }

                function selectFirstSubOption() {
                    var selected = vm.paymentOptions[vm.paymentService.chosenPaymentMethod.paymentOptionId];
                    if(selected.paymentOptionSubList){
                        // select first
                        vm.paymentService.chosenPaymentMethod.paymentOptionSubId = Object.keys(selected.paymentOptionSubList)[0];
                    } else {
                        vm.paymentService.chosenPaymentMethod.paymentOptionSubId = null;
                    }
                }
            }
        };
    });

})(angular.module('vx'));