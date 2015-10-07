(function (module) {
    'use strict';
    module.directive('navigationDropdown', function ($state, $modal, $filter) {
        return {
            templateUrl: 'app/components/Main/navigation/navigationDropdown.html',
            restrict: 'E',
            controllerAs: 'dropdown',
            bindToController: true,
            replace: true,
            scope: {
                items: '=',
                translateTitle: '=',
                disableMore: '=',
                menuType: '@',
                title: '@?',
                updateMethod: '@?',
                moreTitle: '@?'
            },
            controller: function () {
                var vm = this;

                vm.goToMenuPage = goToMenuPage;
                vm.openModal = openModal;

                function goToMenuPage(e, item) {

                    // hide menu on click
                    closeDropdown(e.currentTarget);

                    // for Label,Main Genre,Genre,Style
                    if (item.freq) {
                        $state.go('home.products.menu', {
                            type: vm.menuType,
                            key: item.key || item.style,
                            title: getMenuTitle(item)
                        });
                    } else if (vm.menuType === 'releases' || vm.menuType === 'specials') {
                        // for Releases and Specials
                        $state.go('home.products.sales', {
                            type: vm.menuType,
                            id: item._id,
                            title: item.descr || item.title
                        });
                    }

                }

                function openModal() {
                    $modal.open({
                        templateUrl: 'app/components/Main/navigation/modal/menuModal.html',
                        controller: 'menuModalCtrl',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            title: function () {
                                return vm.title;
                            },
                            updateMethod: function () {
                                return vm.updateMethod;
                            },
                            menuType: function () {
                                return vm.menuType;
                            }
                        }
                    });
                }

                function closeDropdown(currentTarget) {
                    $(currentTarget).closest('.dropdown-menu').fadeOut();
                }

                function getMenuTitle(item) {
                    return vm.translateTitle ? $filter('translate')('genres.' + item.key) : (item.descr || item.style);
                }
            }
        };
    });

})(angular.module('vx'));
