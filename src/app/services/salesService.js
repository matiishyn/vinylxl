(function (module) {
    'use strict';
    module.factory('Sales', function ($http, API_URL) {

        var SalesServer = {
            getList: function () {
                var request = $http({
                    url: API_URL + 'slides'
                });
                return request.then(handleSuccess);
            }

        };

        function handleSuccess(response) {
            return response ? response.data : [];
        }


        return SalesServer;
    });
})(angular.module('vx'));
