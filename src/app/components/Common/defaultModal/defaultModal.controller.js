(function (module) {
    'use strict';

    module.controller('defaultModalCtrl', function (title, templateName, $scope, $modalInstance) {

        $scope.title = title;
        $scope.templateName = templateName;

        $scope.cancel = function () {
            $modalInstance.close();
        };
    });

})(angular.module('vx'));