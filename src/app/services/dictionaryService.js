/**
 * Cart service is used to store items inside User's cart
 */
(function (module) {
    'use strict';

    module.factory('Dictionary', function ($filter) {

        var itemsPerPageData = [{
            name: 12,
            value: 12
        }, {
            name: 24,
            value: 24
        }, {
            name: 36,
            value: 36
        }];

        var sortData = [{
            name: 'Title A->Z',
            value: 'title:1'
        }, {
            name: 'Title Z->A',
            value: 'title:-1'
        },{
            name: 'Release date - newest',
            value: 'date:1'
        }, {
            name: 'Release date - oldest',
            value: 'date:-1'
        }];

        // EU, IMP, JPN, NLD, USA
        var originData = [
            {name: $filter('translate')('filters.origin.Europe'), value: 'EU'},
            {name: $filter('translate')('filters.origin.Import'), value: 'IMP'},
            {name: $filter('translate')('filters.origin.Japan'), value: 'JPN'},
            {name: $filter('translate')('filters.origin.Netherlands'), value: 'NLD'},
            {name: $filter('translate')('filters.origin.USA'), value: 'USA'}
        ];
        // LP, 7in, 12in
        var mediaData = [
            {name: 'LP', value: 'LP'},
            {name: '7"', value: '7in'},
            {name: '12"', value: '12in'}
        ];

        var searchDropdown = [
            'all',
            'artists.name',
            'title',
            //'genre.descr', - removed temporary
            //'styles', - removed temporary
            'eancode'
        ];

        return {
            itemsPerPageData: itemsPerPageData,
            sortData: sortData,
            originData: originData,
            mediaData: mediaData,
            searchDropdown: searchDropdown
        };
    });

})(angular.module('vx'));