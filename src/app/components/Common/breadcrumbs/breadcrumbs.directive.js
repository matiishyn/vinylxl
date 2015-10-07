(function(module) {
    'use strict';

    module.directive('breadcrumbs', function () {
        return {
            templateUrl: 'app/components/Common/breadcrumbs/breadcrumbs.html',
            restrict: 'E',
            controllerAs: 'breadcrumbsCtrl',
            bindToController: true,
            controller: function() {
                var vm = this;

                vm.data = [{
                    title: 'Home',
                    uiSref: 'home'
                },{
                    title: 'Search',
                    uiSref: 'home.products.search'
                }];
            }
        };
    });
    
})(angular.module('vx'));