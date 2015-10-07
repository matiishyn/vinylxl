(function (module) {
    'use strict';

    module.directive('productsFilter', function (Dictionary, FiltersService, CONFIG, $timeout) {

        return {
            templateUrl: 'app/components/Product/productsFilter/productsFilter.html',
            restrict: 'E',
            scope: {
                updateMethod: '&',
                itemsPerPageModel: '=',
                sortModel: '='
            },
            controllerAs: 'filters',
            bindToController: true,
            controller: function ($scope) {
                var vm = this,
                    rangeElement = angular.element('#daterangepicker'),
                    filtersContainer = angular.element('#filters-container');


                // aliases
                vm.FiltersService = FiltersService;
                vm.fo = FiltersService.filterObj;
                vm.fs = FiltersService.filterStr;
//                vm.showFilters = true;


                // Items per page and sorting data
                vm.itemsPerPageData = Dictionary.itemsPerPageData;
                vm.sortData = Dictionary.sortData;

                // origin_id
                vm.tempSelectedOrigin = []; // to store origin data before pressing Apply
                vm.originData = Dictionary.originData;
                $scope.$watchCollection('filters.FiltersService.filterObj.selectedOriginObj', function (newVal, oldVal) {
                    if (newVal && (oldVal !== newVal)) {
                        vm.fs.selectedOrigin = _.pluck(newVal, 'value').join(',');
                    }
                });


                // media
                vm.tempSelectedMedia = []; // to store origin data before pressing Apply
                vm.mediaData = Dictionary.mediaData;
                $scope.$watchCollection('filters.FiltersService.filterObj.selectedMediaObj', function (newVal, oldVal) {
                    if (newVal && (oldVal !== newVal)) {
                        vm.fs.selectedMedia = _.pluck(newVal, 'value').join(',');
                    }
                });

                // release date
                vm.tempReleaseDateFrom = '';
                vm.tempReleaseDateTo = '';

                $scope.$watch('filters.FiltersService.filterObj.releaseDateFrom', function (newVal, oldVal) {
                    if (newVal && (oldVal !== newVal) && (newVal !== CONFIG.defaultStartDate)) {
                        vm.fs.releaseDateFrom = moment(newVal).format(CONFIG.serverDateFormat);
                    }
                });

                $scope.$watch('filters.FiltersService.filterObj.releaseDateTo', function (newVal, oldVal) {
                    if (newVal && (oldVal !== newVal) && (newVal !== CONFIG.defaultEndDate)) {
                        vm.fs.releaseDateTo = moment(newVal).format(CONFIG.serverDateFormat);
                    }
                });

                // methods
                vm.onSelect = onSelect;
                vm.onReset = onReset;
                vm.toggleFilters = toggleFilters;
                vm.getLabels = getLabels;
                vm.getInitialStartDate = getInitialStartDate;
                vm.getInitialEndDate = getInitialEndDate;
                vm.removeFilter = removeFilter;
                vm.removeSelectedDateFrom = removeSelectedDateFrom;
                vm.removeSelectedDateTo = removeSelectedDateTo;


                // ==========================
                /**
                 * Apply button handler
                 */
                function onSelect() {
                    // copy values from tempSelected* to selected*Obj
                    vm.fo.selectedOriginObj = vm.tempSelectedOrigin;
                    vm.fo.selectedMediaObj = vm.tempSelectedMedia;

                    // dates
                    vm.fo.releaseDateFrom = vm.tempReleaseDateFrom;
                    vm.fo.releaseDateTo = vm.tempReleaseDateTo;

                    $timeout(function () {
                        vm.updateMethod();
                    });

                    toggleFilters();    // close filters after applying
                }

                /**
                 * Reset button handler
                 */
                function onReset() {
                    vm.fo.selectedOriginObj = [];
                    vm.fo.selectedMediaObj = [];

                    vm.tempSelectedOrigin = [];
                    vm.tempSelectedMedia = [];

                    // dates
                    vm.tempReleaseDateFrom = '';
                    vm.tempReleaseDateTo = '';

                    vm.fo.releaseDateFrom = '';
                    vm.fs.releaseDateFrom = '';
                    vm.fo.releaseDateTo = '';
                    vm.fs.releaseDateTo = '';

                    rangeElement
                        .val(CONFIG.defaultStartDate + CONFIG.dateRangeDivider + CONFIG.defaultEndDate)
                        .data('daterangepicker')
                        .setStartDate(CONFIG.defaultStartDate);
                    rangeElement.data('daterangepicker').setEndDate(CONFIG.defaultEndDate);

                    $timeout(function () {
                        vm.updateMethod();
                    });
                }

                function toggleFilters() {
                    vm.showFilters = !vm.showFilters;
                    filtersContainer.slideToggle(); // can be changed to ngAnimate
                }

                function getLabels(objTitleStr) {
                    var obj = vm.fo[objTitleStr];
                    return obj ? _.pluck(obj, 'name') : false;
                }

                /**
                 * set dates in fields if ones were predefined
                 */
                function getInitialStartDate() {
                    return vm.fo.releaseDateFrom ?
                        moment(vm.fo.releaseDateFrom).format(CONFIG.displayDateFormat) :
                        '';
                }

                function getInitialEndDate() {
                    return vm.fo.releaseDateTo ?
                        moment(vm.fo.releaseDateTo).format(CONFIG.displayDateFormat) :
                        '';
                }

                // remove from summary methods
                function removeFilter(filterName, index) {
                    var filter = 'selected' + filterName + 'Obj';
                    vm.fo[filter].splice(index, 1);
                    $timeout(function () {
                        vm.updateMethod();
                    });
                }

                function removeSelectedDateFrom() {
                    vm.tempReleaseDateFrom = '';

                    vm.fo.releaseDateFrom = '';
                    vm.fs.releaseDateFrom = '';

                    // change input value
                    var endDateValue = rangeElement.val().split(CONFIG.dateRangeDivider)[1];
                    rangeElement
                        .val(CONFIG.defaultStartDate + CONFIG.dateRangeDivider + endDateValue)
                        .data('daterangepicker')
                        .setStartDate(CONFIG.defaultStartDate);

                    $timeout(function () {
                        vm.updateMethod();
                    });
                }

                function removeSelectedDateTo() {
                    vm.tempReleaseDateTo = '';

                    vm.fo.releaseDateTo = '';
                    vm.fs.releaseDateTo = '';

                    // change input value
                    var startDateValue = rangeElement.val().split(CONFIG.dateRangeDivider)[0];
                    rangeElement
                        .val(startDateValue + CONFIG.dateRangeDivider + CONFIG.defaultEndDate)
                        .data('daterangepicker')
                        .setEndDate(CONFIG.defaultEndDate);

                    $timeout(function () {
                        vm.updateMethod();
                    });
                }
            }
        };
    });

})(angular.module('vx'));