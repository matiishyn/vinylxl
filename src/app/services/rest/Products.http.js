(function (module) {
    'use strict';

    module.factory('Products', function ($http, API_URL_v2) {
        var API_URL = API_URL_v2;
        function getProductAjax(params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'products/',
                params: params
            });
            return request.then(handleSuccess);
        }

        function getSpecials(id, params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'specials/' + id + '/products',
                params: params
            });
            return request.then(handleSuccess);
        }

        // todo should be used only this method for specials, releases, sales
        function getSales(type, id, params) {
            var request = $http({
                url: API_URL + type +'/' + id + '/products',
                params: params
            });
            return request.then(handleSuccess);
        }

        function query(params) {
            return getProductAjax(params);
        }

        function getMenuResult(type, key) {
            return getProductAjax({
                '_q': type,
                '_a': 'g',
                'g:eq': key
            });
        }

        function getProductsByRegex(type, key) {
            return getProductAjax({
                '_q': type,
                '_a': 'g',
                'g:regex': key
            });
        }

        function handleSuccess(response) {
            return response.data;
        }

        return {
            getMenuResult: getMenuResult,
            getSpecials: getSpecials,
            getSales: getSales,
            getProductsByRegex: getProductsByRegex,
            query: query
        };
    });

})(angular.module('vx'));
