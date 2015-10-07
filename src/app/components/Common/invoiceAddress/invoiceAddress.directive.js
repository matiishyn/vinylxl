(function(module) {
    'use strict';

    module.directive('invoiceAddress', function () {
        return {
            templateUrl: 'app/components/Common/invoiceAddress/invoiceAddress.html',
            restrict: 'E',
            scope: {
                address: '='
            },
            controllerAs: 'invoiceAddress',
            bindToController: true,
            controller: function() {
                //var vm = this;


            }
        };
    });
    
})(angular.module('vx'));