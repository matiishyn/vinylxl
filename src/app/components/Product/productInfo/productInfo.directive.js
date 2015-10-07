(function (module) {
    'use strict';

    module.directive('productInfo', function (CommonMethods) {
        return {
            templateUrl: 'app/components/Product/productInfo/productInfo.html',
            restrict: 'E',
            replace: true,
            scope: {
                product: '='
            },
            controllerAs: 'productInfo',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.getArtists = getArtists;
                vm.CommonMethods = CommonMethods;

                function getArtists() {
                    var result = '',
                        artists = vm.product.artists;
                    if(artists && artists.length === 1) {
                        result = artists[0].name;
                    } else {
                        // handle multi-author
                    }
                    return result;
                }
            }
        };
    });

})(angular.module('vx'));