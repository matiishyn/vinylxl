(function (module) {
    'use strict';
    module.controller('personalInfoCtrl', function ($scope, $modal) {
        $scope.changeInfo = changeInfo;

        function changeInfo() {

            $modal.open({
                templateUrl: 'app/views/User/personalInfo/editInfoModal.html',
                controller: 'editInfoModalCtrl',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    address: function () {
                        return $scope.profile.billing_address;
                    }
                }
            });
        }
    });
})(angular.module('vx'));
