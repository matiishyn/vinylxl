(function(module) {
    'use strict';

    module.directive('tracklist', function () {
        return {
            templateUrl: 'app/components/Product/tracklist/tracklist.html',
            restrict: 'E',
            scope: {
                tracks: '='
            },
            controllerAs: 'tracklist',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.currentPage = 1;
            }
        };
    });
    
})(angular.module('vx'));