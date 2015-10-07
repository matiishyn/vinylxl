(function(module) {
    'use strict';

    module.factory('Specials', function($resource, API_URL, $q) {
        var resource = $resource(API_URL + 'specials/', {}, {
                get: {
                    method: 'GET',
                    url: API_URL + 'specials/?_q=_id,title,descr,active&_a=id,t,d,a&a:eq=true',
                    isArray: true
                },
                getProductsById: {
                    method: 'GET',
                    url: API_URL + 'specials/:id/products?_q=eancode,title,artists,retail_price&_a=ec,t,a,p',
                    isArray: true
                }
            }),
            specials = {
                current: {},
                currentIndex: 0,
                init: _.once(init)
            };

        //init
        specials.init();

        function init () {
            return resource.get({eq: ':eq'}).$promise
                    .then(function (data) {
                        specials.categories = data;
                        specials.current = specials.categories[specials.currentIndex];
                    })
                    .then(setCurrentProducts);
        }

        //private methods
        function setCurrentProducts() {
            if (specials.current.products) {
                return $q.when(specials.current);
            }

            return resource.getProductsById({id: specials.current._id}).$promise
                .then(function (products) {
                    specials.current.products = products;
                    return specials.current;
                });
        }

        //calllbacks for export
        function next () {
            specials.current = specials.categories[++specials.currentIndex] || specials.categories[specials.currentIndex=0];

            return setCurrentProducts();
        }

        function previous () {
            specials.currentIndex = --specials.currentIndex < 0 ? specials.categories.length - 1 : specials.currentIndex;
            specials.current = specials.categories[specials.currentIndex];

            return setCurrentProducts();
        }

        function getCurrent (randomProducts, productsLimit) {
            var current = specials.current;

            if (randomProducts) {
                current.products.random = _.shuffle(current.products);
            }

            if (randomProducts && productsLimit) {
                current.products.randomLimit = _.take(current.products.random, 6);
                return current;
            }

            if (productsLimit) {
                current.products.limit = _.take(current.products, 6);
            }

            return current;
        }

        function getProductsById (id) {
            return resource.getProductsById({id: id}).$promise;
        }

        function getTitleById (id) {
            var special = _.where(specials.categories, {_id: id});
            return special[0] && special[0].title;
        }

        return {
            init: specials.init,
            getCurrent: getCurrent,
            getProductsById: getProductsById,
            getTitleById: getTitleById,
            next: next,
            previous: previous
        };

    });

})(angular.module('vx'));
