(function(module) {
    'use strict';

    module.directive('appHeader', function () {
        return {
            templateUrl: 'app/components/header/header.html',
            restrict: 'E',
            controllerAs: 'header',
            bindToController: true,
            controller: function() {
                var vm = this;
                vm.logo = 'VinylXL';
            },
            link: function (scope, element, attrs, controllers) {}
        };
    });
    
})(angular.module('vx'));