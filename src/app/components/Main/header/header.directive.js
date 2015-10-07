(function (module) {
    'use strict';

    module.directive('appHeader', function ($translate) {
        return {
            templateUrl: 'app/components/Main/header/header.html',
            restrict: 'E',
            controllerAs: 'header',
            bindToController: true,
            controller: function () {
                this.de = function () {
                    $translate.use('de');
                };
                this.en = function () {
                    $translate.use('en');
                };
            }
        };
    });

})(angular.module('vx'));