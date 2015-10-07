// TODO remove this service. Use Products.http.js
(function (module) {
    'use strict';

    module.factory('ProductsService', function ($resource, API_URL) {
        return $resource(API_URL + 'products/:id', {}, {
            related: {
                url: API_URL + 'products/:productId/related',
                method: 'GET',
                isArray: true
            },
            byType: {
                url: API_URL + 'products/?_q=:type&_a=g&g:eq=:query',
                method: 'GET',
                isArray: true
            },
            releases: {
                url: API_URL + 'products?_q=eancode,title,artists,retail_price,release_date&_a=ec,t,a,p,rd&:releaseStartDate&:releaseEndDate',
                method: 'GET',
                isArray: true
            },
            midPrice: {
                url: API_URL + 'products?_q=eancode,title,artists,retail_price,sort_code_id&_a=ec,t,a,p,s&s%3Aeq=M',
                method: 'GET',
                isArray: true
            }
        });
    });

})(angular.module('vx'));
