(function (module) {
    'use strict';
    module.filter('deliveryDays', function ($filter) {
        return function (input) {
            var result = '';
            if (input > 0 && input < 6) {
                result = input + 1 + ' ' + $filter('translate')('searchElement.labels.days'); // 2 days
            } else if (input >= 6 && input < 13) {
                result = $filter('translate')('searchElement.labels.oneWeek'); // more than 1 week
            } else if (input >= 13) {
                result = $filter('translate')('searchElement.labels.twoWeeks'); // more than 2 weeks
            } else {
                result = '-';
            }

            return result;
        };
    });

})(angular.module('vx'));