(function (module) {
    'use strict';

    module.controller('termsModalCtrl', function ($scope, $modalInstance) {
        $scope.cancel = function () {
            $modalInstance.close();
        };
    });

})(angular.module('vx'));