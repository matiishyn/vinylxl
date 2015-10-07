(function (module) {
    'use strict';

    module.factory('MenuItems', function ($http, API_URL) {

        /**
         * Every method here is used to get items for Menu modal window after clicking More * (eg. More Genres)
         * @param params {object} Will be used for search and paging
         */

        function getGenres(params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'genres?_q=freq,main_genre_key,genres,descr&_a=f,mgk,g,d&mgk:exists=true&f:gt=0',
                params: params
            });
            return request.then(handleSuccess);
        }

        function getLabels(params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'labels?_q=freq,descr&_a=f,d&f:gt=0',
                params: params
            });
            return request.then(handleSuccess);
        }

        function getStyles(params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'styles?_q=freq,style&_a=f,d&f:gt=0',
                params: params
            });
            return request.then(handleSuccess);
        }

        function getReleases(params) {
            var request = $http({
                method: 'get',
                url: API_URL + 'releases?_q=key,descr,active&_a=k,d,a&a:eq=true',
                params: params
            });
            return request.then(handleSuccess);
        }

        function handleSuccess(response) {
            return response.data;
        }

        return {
            getGenres: getGenres,
            getLabels: getLabels,
            getStyles: getStyles,
            getReleases: getReleases
        };
    });

})(angular.module('vx'));