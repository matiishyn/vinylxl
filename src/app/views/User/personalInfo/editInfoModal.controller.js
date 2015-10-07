(function (module) {
    'use strict';

    module.controller('editInfoModalCtrl', function ($scope, $modalInstance, address, Spinner, Auth, toastr) {

        // create new variable for storing address
        $scope.address = {};
        _.extendOwn($scope.address, address);

        $scope.ok = saveUserAddress;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function saveUserAddress() {

            if ($scope.updateAddressForm.$valid) {
                var promise = Auth.resource.updateProfile({
                    billing_address: $scope.address
                });
                Spinner.onPromise(promise);

                promise.$promise.then(function() {
                    // update variable
                    Auth.profile = promise;

                    // copy new values to parent variable
                    _.extendOwn(address, $scope.address);

                    $modalInstance.close();
                    toastr.success('User data is updated');
                });
            }
        }


    });

})(angular.module('vx'));
