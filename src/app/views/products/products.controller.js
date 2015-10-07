(function (module) {
    'use strict';

    module.controller('ProductsCtrl', function ($scope, Spinner, $state, $stateParams, Products, CommonMethods, CONFIG, Dictionary, ProductsRequestFactory, FiltersService) {

        var fs = FiltersService.filterStr;

        $scope.products = [];   // received items as a response will be stored here
        $scope.title = '';  // page title
        $scope.maxPagesNumber = 10;
        $scope.vm = {
            itemsPerPage: 24,
            currentPage: 0,
            sort: ''
        };

        var vm = $scope.vm,
            getCommonParams = function () {
                var params = {
                    limit: vm.itemsPerPage + 1,
                    skip: vm.currentPage * vm.itemsPerPage
                };
                // add sorting
                if (vm.sort) {
                    params['_s'] = vm.sort;
                }
                //
                if ($scope.productsLength) {
                    params['limit'] = $scope.productsLength;
                }
                // FILTERS
                // origin
                if (fs.selectedOrigin) {
                    params['origin_id:in'] = fs.selectedOrigin;
                }
                // media
                if (fs.selectedMedia) {
                    params['media:in'] = fs.selectedMedia;
                }
                // releaseDateFrom
                if (fs.releaseDateFrom) {
                    params['date:gte'] = fs.releaseDateFrom;
                }
                // releaseDateTo
                if (fs.releaseDateTo) {
                    params['date:lte'] = fs.releaseDateTo;
                }

                return params;
            };


        /**
         * Read current state and run appropriate query
         */
        function update() {
            var currentState = $state.current.name.split('.')[2],
                request = ProductsRequestFactory[currentState](getCommonParams());

            Spinner.onPromise(request.products.then(function (products) {
                $scope.products = products.data;
                $scope.productsLength = products.length;
//                setNewLength(products.length);
                $scope.title = request.title;
            }));
        }

        function nextPage() {
            if ($scope.products.length > vm.itemsPerPage) {
                vm.currentPage++;
                update();
            }
        }

        function prevPage() {
            if (vm.currentPage > 0) {
                vm.currentPage--;
                update();
            }
        }

        function goToPage(n) {
            vm.currentPage = n - 1;
            update();
        }

        function onFilterUpdate() {
            vm.currentPage = 0;
            update();
        }


        // update on changing itemsPerPage
        $scope.$watch('vm.itemsPerPage', function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                vm.currentPage = 0;
                update();
            }
        });

        // update on changing sorting
        $scope.$watch('vm.sort', function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                vm.currentPage = 0;
                update();
            }
        });


        // get products based on current parameters
        update();

        // methods
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;
        $scope.goToPage = goToPage;
        $scope.onFilterUpdate = onFilterUpdate;
    });

})
(angular.module('vx'));
