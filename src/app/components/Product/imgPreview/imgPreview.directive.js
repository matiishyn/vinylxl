(function (module) {
    'use strict';

    module.directive('imgPreview', function (CommonMethods, $timeout) {
        return {
            templateUrl: 'app/components/Product/imgPreview/imgPreview.html',
            restrict: 'E',
            scope: {
                product: '='
            },
            controllerAs: 'imgPreview',
            bindToController: true,
            controller: function () {
                var vm = this;

                vm.activeImg = '1';
                vm.CommonMethods = CommonMethods;
            },
            link: function ($scope, element) {

                $scope.$watch('imgPreview.images', function (newVal) {
                    if (newVal && newVal.length > 3) {
                        $timeout(function () {
                            initSlider();
                        });
                    }
                });

                function initSlider() {
                    var el = element.find('.js-slick-slider');
                    // remove previous instance if exists
                    if (el.hasClass('slick-initialized')) {
                        el.slick('unslick');
                    }
                    // init
                    el.slick({
                        infinite: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    });
                }
            }
        };
    });

})(angular.module('vx'));