(function (module) {
    'use strict';

    module.controller('menuModalCtrl', function ($scope, $modalInstance, title, MenuService, updateMethod, Spinner, menuType, $state, $http, MenuItems) {

        $scope.pageNumber = 30;
        $scope.currentPage = 0;
        $scope.searchQuery = '';

        var regex = '';
        $scope.sorting = 'f:-1';

        updateData();

        $scope.nextPage = function () {
            if ($scope.items.length > $scope.pageNumber) {
                $scope.currentPage++;
                updateData();
            }
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
                updateData();
            }

        };

        $scope.resetSearch = function () {
            $scope.currentPage = 0;
            regex = '';
            $scope.sorting = 'f:-1';
            $scope.searchQuery = '';
            updateData();
        };

        $scope.findItems = function () {
            $scope.currentPage = 0;
            regex = '\\b' + $scope.searchQuery + '\\S*';
            $scope.sorting = '';
            updateData();
        };

        $scope.sortAz = function () {
            $scope.sorting = 'd:1';
            updateData();
        };

        $scope.sortFreq = function () {
            $scope.sorting = 'f:-1';
            updateData();
        };

        function updateData() {
            var promise = MenuItems[updateMethod]({
                limit    : $scope.pageNumber + 1,
                '_s'     : $scope.sorting,
                'd:regex': regex,
                skip     : $scope.currentPage * $scope.pageNumber
            }).then(function (result) {
                $scope.items = result;
            });
            Spinner.onPromise(promise);
        }

        $scope.title = title;
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /**
         * Open appropriate page based on clicked item (ex. Style:House -> open all products)
         * @param item
         */
        $scope.goToMenuPage = function (item) {

            // hide modal
            $scope.cancel();

            // can be either Releases or other items
            // Other items have 'freq'
            if(item.freq) {
                $state.go('home.products.menu', {
                    type: menuType,
                    key: item.key || item.style,
                    title: item.descr || item.style
                });
            } else {
                $state.go('home.products.sales', {
                    type: 'releases',
                    id: item._id,
                    title: item.descr
                });
            }

        };

        $scope.$watch('searchQuery', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal === '') {
                // reset search
                $scope.resetSearch();
            }
            if (newVal !== oldVal && newVal !== '') {
                $scope.findItems();
            }
        });


    });

})(angular.module('vx'));