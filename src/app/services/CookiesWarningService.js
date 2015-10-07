//http://silktide.com/cookieconsent
(function (module) {
    'use strict';
    module.factory('CookiesWarningService', function ($window, $filter, $rootScope) {

        return {
            start: function () {
                this.updateCookiesMsg();
                this.listenToLanguageChange();
            },
            updateCookiesMsg: function () {
                $window.update_cookieconsent_options ? $window.update_cookieconsent_options({
                    "message": $filter('translate')('errorMsgs.cookiesMsg'),
                    "dismiss": $filter('translate')('errorMsgs.cookiesClose'),
                    "link": null,
                    "theme": "dark-bottom"
                }) : false;
            },
            listenToLanguageChange: function () {
                var me = this;
                $rootScope.$on('$translateChangeSuccess', function () {
                    me.updateCookiesMsg();
                });
            }
        };

    });

})(angular.module('vx'));