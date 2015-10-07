(function (module) {
    'use strict';

    module.factory('ProductsRequestFactory', function ($stateParams, Products, CommonMethods, CONFIG, Specials, $filter) {
        var vm = {
            commonQ: 'retail_price,title,origin_id,release_date,origin_id,media',
            commonA: 'price,title,origin,date,origin_id,media'
        };

        function getMenuTitle() {
            var type = $stateParams.type,
                val = decodeURIComponent($stateParams.title),
                title = '';
            switch (type) {
                case 'label.key':
                    title += $filter('translate')('menu.Label');
                    break;
                case 'genre.main.key':
                    title += $filter('translate')('menu.MainGenre');
                    break;
                case 'genre.key':
                    title += $filter('translate')('menu.Genre');
                    break;
                case 'styles':
                    title += $filter('translate')('menu.Style');
                    break;
            }

            return title + ': ' + val;
        }

        // get products depends on current state
        return {
            'search': function (commonParams, searchQuery, type) {
                var products,
                    searchType = type || $stateParams.type,
                    query = searchQuery || $stateParams.searchQuery;
                if (!searchType || searchType === 'all') {
                    products = Products.query(_.extend({
                        '_q': vm.commonQ,
                        '_a': vm.commonA,
                        text: query
                    }, commonParams));
                } else {
                    products = Products.query(_.extend({
                        '_q': searchType + ',' + vm.commonQ,
                        '_a': 'g,' + vm.commonA,
                        'g:regex': CommonMethods.toSearchRegex(decodeURIComponent(query))
                    }, commonParams));
                }
                return {products: products, title: ''};
            },

            // MENU
            'menu': function (commonParams) {
                var products = Products.query(_.extend({
                    '_q': $stateParams.type + ',' + vm.commonQ,
                    '_a': 'g,' + vm.commonA,
                    'g:eq': decodeURIComponent($stateParams.key)
                }, commonParams));
                return {products: products, title: getMenuTitle()};
            },
            // SALES
            'sales': function (commonParams) {
                var products = Products.getSales($stateParams.type, $stateParams.id, _.extend({
                    '_q': vm.commonQ,
                    '_a': vm.commonA
                }, commonParams));
                return {products: products, title: $stateParams.title};
            },
            // SPECIALS
            'newReleases': function (commonParams) {
                // GET 'products?_q=eancode,title,artists,retail_price,release_date&_a=ec,t,a,p,rd&_f=ec,t,a,p&:releaseStartDate&:releaseEndDate',
                var products = Products.query(_.extend({
                    '_q': vm.commonQ,
                    '_a': vm.commonA,
                    'date:gte': moment().subtract(14, 'days').format(CONFIG.serverDateFormat),
                    'date:lte': moment().format(CONFIG.serverDateFormat)
                }, commonParams));
                return {products: products, title: $filter('translate')('releases.new')};
            },
            'expectedReleases': function (commonParams) {
                var products = Products.query(_.extend({
                    '_q': vm.commonQ,
                    '_a': vm.commonA,
                    'date:gte': moment().format(CONFIG.serverDateFormat)
                }, commonParams));
                return {products: products, title: $filter('translate')('releases.expected')};
            },
            'midPrice': function (commonParams) {
                // GET 'products?_q=eancode,title,artists,retail_price,sort_code_id&_a=ec,t,a,p,s&_f=ec,t,a,p&s:eq=M'
                var products = Products.query(_.extend({
                    '_q': 'sort_code_id,' + vm.commonQ,
                    '_a': 's,' + vm.commonA,
                    's:eq': 'M'
                }, commonParams));
                return {products: products, title: $filter('translate')('releases.midPrice')};
            }
        };
    });

})(angular.module('vx'));
