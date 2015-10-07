(function (module) {
    'use strict';

    module.directive('artistLink', function ($state) {
        return {
            templateUrl: 'app/components/Common/artistLink/artistLink.html',
            restrict: 'E',
            scope: {
                title: '@'
            },
            controllerAs: 'artistLinkCtrl',
            controller: function () {
                var vm = this;

                vm.search = search;

                function search() {
                    $state.go('home.products.search', {searchQuery: vm.title, type: 'artists.name'});
                }
            },
            bindToController: true
        };
    });

})(angular.module('vx'));