(function (module) {
    'use strict';

    module.directive('addressForm', function (Postcode, Spinner) {
        return {
            templateUrl: 'app/components/Common/addressForm/addressForm.html',
            restrict: 'E',
            scope: {
                model: '=?',
                withEmail: '=?',
                showValidation: '=?'
            },
            controllerAs: 'adr',
            bindToController: true,
            controller: function ($scope) {
                var vm = this;


                vm.model = vm.model || {};

                // select NL by default
                vm.model.country = 'NL';
                vm.model.salutation = 'Mr.';

                vm.postal_codeAutocompleteDetails = {};

                function parsepostal_codeDetails() {
                    var addressComponents = vm.postal_codeAutocompleteDetails.address_components;
                    if (addressComponents) {
                        var postal_codeObj = _.find(addressComponents, function (addrs) {
                            return addrs.types.indexOf("postal_code") !== -1;
                        });
                        vm.model.postal_code = postal_codeObj ? postal_codeObj.long_name : vm.model.postal_code;
                    }
                }

                function isErrorVisible(formEl) {
                    return formEl && ((formEl.$invalid && formEl.$touched) || (vm.showValidation && formEl.$invalid));
                }

                function isErrorBoxVisible(form) {
                    return (vm.showValidation && form.$invalid) || _.values(form.$error).some(function (el) {
                            return el.some(function (el) {
                                return el.$touched;
                            });
                        });
                }

                $scope.$watch('adr.postal_codeAutocompleteDetails', function () {
                    parsepostal_codeDetails();
                }, true);

                $scope.$watch('adr.model.house', function (newVal, oldVal) {
                    if(newVal && newVal !== oldVal) {
                        getAddressByZipAndNo();
                    }
                });

                $scope.$watch('adr.model.postal_code', function (newVal, oldVal) {
                    if(newVal && newVal !== oldVal) {
                        getAddressByZipAndNo();
                    }
                });

                // methods
                vm.isErrorVisible = isErrorVisible;
                vm.isErrorBoxVisible = isErrorBoxVisible;

                // regexp
                vm.az = "[\\sa-zA-Z]+";
                vm.az19 = "[\\sa-zA-Z\\d\\/\\.]+";
                vm.tel = "^[\\d\+]+[\\d\\-]*";

                function getAddressByZipAndNo() {
                    if (!vm.model.house || !vm.model.postal_code) {
                        return false;
                    }

                    var promise = Postcode.getAddress({
                        zip: vm.model.postal_code,
                        number: vm.model.house
                    }).then(function(response) {
                        var address = response.data;
                        vm.model.address = address.street;
                        vm.model.city = address.city;
                    });

                    Spinner.onPromise(promise);

                }
            }
        };
    });

})(angular.module('vx'));