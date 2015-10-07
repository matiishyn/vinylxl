(function (module) {
    'use strict';

    module.directive('mainSearch', function ($state, $rootScope, $stateParams, ProductsRequestFactory, CommonMethods, Dictionary, $filter) {
        return {
            templateUrl: 'app/components/Main/mainSearch/mainSearch.html',
            restrict: 'E',
            controllerAs: 'searchCtrl',
            bindToController: true,
            controller: function () {
                var vm = this,
                    routeName = 'home.products.search';

                vm.searchDropdownOptions = Dictionary.searchDropdown;
                vm.getDropdownOptionLabel = getDropdownOptionLabel;

                vm.searchQuery = $state.params.searchQuery ? decodeURIComponent($state.params.searchQuery || '') : '';
                vm.search = search;

                vm.dropdownOpened = false;

                // auto select current search option based on data from url
                // vm.searchOpt = $stateParams.type || 'all'; - removed
                vm.searchOpt = 'all';

                vm.setSearchOpt = setSearchOpt;

                vm.getSearchAutocompleteResults = getSearchAutocompleteResults;
                vm.openProductPage = openProductPage;


                // ui-router event. Fill search with route params
                // https://github.com/angular-ui/ui-router/wiki#state-change-events
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                    event.preventDefault();

                    // watch of searchQuery url parameter and keep Search input same as parameter
                    if (toState.name === routeName && toParams.searchQuery) {
                        vm.searchQuery = decodeURIComponent(toParams.searchQuery);
                    } else {
                        vm.searchQuery = '';
                    }

                    // watch of type url parameter and keep Search options dropdown same as url parameter
                    if (toState.name === routeName && toParams.type) {
                        vm.searchOpt = toParams.type;
                    }
                });

                function search(form) {
                    if (form.$valid) {
                        $state.go('home.products.search', {
                            searchQuery: vm.searchQuery,
                            type: vm.searchOpt
                        });
                    }
                }

                function setSearchOpt(opt) {
                    vm.searchOpt = opt;
                }

                function getSearchAutocompleteResults(searchQuery) {
                    return ProductsRequestFactory['search']({}, searchQuery, vm.searchOpt).products.then(function (response) {
                        // get first N elements
                        return response.data.splice(0, 15);
                    });
                }

                function openProductPage(item) {
                    $state.go('home.product', {
                        id: item._id,
                        title: CommonMethods.spaceToDash(item.title)
                    });
                }

                function getDropdownOptionLabel(item) {
                    return $filter('translate')('searchElement.labels.' + item);
                }
            }
        };
    });

})(angular.module('vx'));