(function(module) {
    'use strict';

    module.directive('specials', function() {
        return {
            templateUrl: 'app/components/Main/specials/specials.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: 'specialsCtrl',
            controllerAs: 'specials',
            bindToController: true
        };
    });

    module.controller('specialsCtrl', function ($scope, Specials, Spinner, $q, $state) {
        var specials = this;

        Spinner.onPromise(
            Specials.init().then(setCurrent)
        );

        specials.next = function () {
            Spinner.onPromise(
                Specials.next().then(setCurrent)
            );
        };

        specials.previous = function () {
            Spinner.onPromise(
                Specials.previous().then(setCurrent)
            );
        };

        specials.goToProducts = function () {
            $state.go('home.products.sales', {
                type: 'specials',
                id: specials.current._id,
                title: specials.current.title
            });
        };

        function setCurrent() {
            specials.current = Specials.getCurrent(true, 6);
        }
    });

})(angular.module('vx'));