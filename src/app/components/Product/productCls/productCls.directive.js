(function(module) {
    'use strict';

    module.directive('productCls', function () {
        return {
            templateUrl: 'app/components/Product/productCls/productCls.html',
            restrict: 'E',
            scope: {
                cls: '='
            },
            controllerAs: 'clsCtrl',
            bindToController: true,
            controller: function() {}
        };
    });
    
})(angular.module('vx'));