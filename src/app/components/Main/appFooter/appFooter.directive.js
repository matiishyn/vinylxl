(function (module) {
    'use strict';

    module.directive('appFooter', function (CommonMethods, ContactUs, Spinner) {
        return {
            templateUrl: 'app/components/Main/appFooter/appFooter.html',
            restrict: 'E',
            controllerAs: 'footerCtrl',
            controller: function ($scope) {
                var vm = this;

                // data for Contact Us
                vm.data = {};

                vm.openModal = CommonMethods.openDefaultModal;

                vm.sendContactUsMsg = function() {
                    if($scope.contactUsForm.$valid) {
                        var promise = ContactUs.post(vm.data.email, vm.data.msg);
                        Spinner.onPromise(promise);
                        promise.then(function() {
                            // todo confirmation
                        });
                    }
                };
            }
        };
    });

})(angular.module('vx'));
