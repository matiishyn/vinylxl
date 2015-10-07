(function (module) {
    'use strict';

    module.directive('navigation', function (CONFIG, SOCIAL_LINKS) {
        return {
            templateUrl: 'app/components/Main/navigation/navigation.html',
            restrict: 'E',
            controllerAs: 'navigation',
            bindToController: true,
            controller: function ($location, MenuService) {
                var vm = this;
                vm.items = [];
                vm.facebookLink = SOCIAL_LINKS.facebook;
                vm.twitterLink = SOCIAL_LINKS.twitter;

                // get items to fill dropdown for menu items
                vm.mainGenres = MenuService.getMainGenres({exists: ':exists'});
                vm.genres = MenuService.getGenres({exists: ':exists'});
                vm.styles = MenuService.getStyles();
                vm.labels = MenuService.getLabels();
                vm.releases = MenuService.getReleases({eq: ':eq'});
                vm.specials = MenuService.getSpecials({eq: ':eq'});

                vm.isHiddenShowMoreForReleases = function () {
                    return vm.releases.length <= CONFIG.releasesMenuItemsVisible;
                };
            },
            link: function (scope, element) {
                // show/hide dropdown menu on hover
                element.find('ul.menu-list').on('mouseenter', 'li.dropdown', function () {
                    $(this).find('.dropdown-menu').show();
                });
                element.find('ul.menu-list').on('mouseleave', 'li.dropdown', function () {
                    $(this).find('.dropdown-menu').hide();
                });
            }
        };
    });

})(angular.module('vx'));