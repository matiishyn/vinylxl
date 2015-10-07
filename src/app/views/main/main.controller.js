(function (module) {
    'use strict';

    module.controller('MainCtrl', function (products, Slides, $rootScope, $scope, CommonMethods, ProductsService, CookiesWarningService, Spinner, $q, $filter, $state, Wishlist, $translate, $window) {
        var today = new Date(),
            twoWeeksAgo = CommonMethods.getDateAgo(today, 14),
            newReleasesRequest = {
                releaseStartDate: 'rd:gte=' + CommonMethods.yyyymmdd(twoWeeksAgo),
                releaseEndDate: 'rd:lte=' + CommonMethods.yyyymmdd(today)
            },
            expectedReleasesRequest = {
                releaseStartDate: 'rd:gte=' + CommonMethods.yyyymmdd(today)
            };

        Wishlist.getProducts();

        $scope.Slides = Slides;

        Spinner.onPromise(
            $q.all([
                ProductsService.releases(newReleasesRequest).$promise
                    .then(function (products) {
                        $scope.newReleases = {
                            descr: $filter('translate')('releases.new'),
                            products: _.take(_.shuffle(products), 6)
                        };
                    }),
                ProductsService.releases(expectedReleasesRequest).$promise
                    .then(function (products) {
                        $scope.expectedReleases = {
                            descr: $filter('translate')('releases.expected'),
                            products: _.take(_.shuffle(products), 6)
                        };
                    }),
                ProductsService.midPrice({}).$promise
                    .then(function (products) {
                        $scope.midPrice = {
                            descr: $filter('translate')('releases.midPrice'),
                            products: _.take(_.shuffle(products), 6)
                        };
                    })
            ]));

        $scope.goToNewReleases = function () {
            $state.go('home.products.newReleases');
        };

        $scope.goToExpectedReleases = function () {
            $state.go('home.products.expectedReleases');
        };

        $scope.goToMidPrice = function () {
            $state.go('home.products.midPrice');
        };

        // TODO Move to service
        /**
         * TRANSLATIONS
         */
        // keep currentLang in rootScope
        $rootScope.currentLang = $translate.use();
        // every time lang is been changed change $rootScope.currentLang
        $rootScope.$on('$translateChangeSuccess', function (options, langOpts) {
            $rootScope.currentLang = langOpts.language;
        });

        // Cookies warning message
        CookiesWarningService.start();

        // todo move to service
        // checking if IE
        $rootScope.isIE = function () {
            return !(window.ActiveXObject) && "ActiveXObject" in window;
        };


        // todo REMOVE
        // TEMP ===================
        $scope.displayTempLogin = !$window.localStorage.getItem('tempLoggedIn');
        $scope.tempChangePass = function (pass) {
            if (pass === 'allemaalbeestjes') {
                $window.localStorage.setItem('tempLoggedIn', true);
                $scope.displayTempLogin = false;
            }
        };
        // =========================
    });

})(angular.module('vx'));
