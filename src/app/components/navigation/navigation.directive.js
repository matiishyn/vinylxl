(function(module) {
    'use strict';
    
    module.directive('navigation', function() {
        return {
            templateUrl: 'app/components/navigation/navigation.html',
            restrict: 'E',
            controllerAs: 'navigation',
            bindToController: true,
            controller: function(MenuItems) {
                var vm = this;
                vm.items = MenuItems;
            },
            link: function (scope, element, attrs, controllers) {}
        };
    });

})(angular.module('vx'));