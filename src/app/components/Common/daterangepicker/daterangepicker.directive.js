(function (module) {
    'use strict';

    module.directive('daterangepicker', function (CONFIG) {
        return {
            restrict: 'AE',
            scope: {
                dateFrom: '=',
                dateTo: '=',
                dateStart: '@',
                dateEnd: '@'
            },
            link: function (scope, element) {
                $(element).daterangepicker({
                    "showDropdowns": true,
                    "showWeekNumbers": true,
                    "startDate": scope.dateStart || CONFIG.defaultStartDate,
                    "endDate": scope.dateEnd || CONFIG.defaultEndDate,
                    "timePickerIncrement": 1,
                    "autoApply": true,
                    "ranges": {
                        "Last Month": [
                            moment().subtract(1, 'month'),
                            moment()
                        ],
                        "Last 2 Months": [
                            moment().subtract(2, 'month'),
                            moment()
                        ],
                        "Last 3 Months": [
                            moment().subtract(3, 'month'),
                            moment()
                        ],
                        "Last 6 Months": [
                            moment().subtract(6, 'month'),
                            moment()
                        ],
                        "Last Year": [
                            moment().subtract(1, 'year'),
                            moment()
                        ],
                        "Last 2 Years": [
                            moment().subtract(2, 'year'),
                            moment()
                        ],
                        "Last 3 Years": [
                            moment().subtract(3, 'year'),
                            moment()
                        ],
                        "Last 5 Years": [
                            moment().subtract(5, 'year'),
                            moment()
                        ],
                        "Last 10 Years": [
                            moment().subtract(10, 'year'),
                            moment()
                        ]
                    },
                    "opens": "left",
                    "drops": "down",
                    "buttonClasses": "btn btn-sm",
                    "applyClass": "btn-success",
                    "cancelClass": "btn-default"
                }, function (start, end) {
                    scope.dateFrom = start;
                    scope.dateTo = end;
                    scope.$apply();
                });
            }
        };
    });


})(angular.module('vx'));