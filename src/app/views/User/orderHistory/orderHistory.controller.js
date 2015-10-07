(function (module) {
    'use strict';

    module.controller('orderHistoryCtrl', function ($scope, Orders, Spinner) {

        Spinner.onPromise(Orders);

        $scope.vm = {
            orders: Orders
        };

    });

})(angular.module('vx'));
