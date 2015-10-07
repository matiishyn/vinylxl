(function (module) {
    'use strict';
    module.controller('profileCtrl', function ($scope, profile, Spinner, $state, LS_TOKEN, $window, Auth) {
        // Go to main if profile is empty
        profile.$promise.then(null, function() {
            $state.go('home');
        });

        // or if token is empty
        if(!Auth.getToken()) {
            $state.go('home');
        }

        Spinner.onPromise(profile);

        $scope.profile = profile;
    });
})(angular.module('vx'));
