(function (module) {
    'use strict';
    module.factory('LangService', function (LS_LANG, $window) {

        return {
            getLang: function() {
                return $window.localStorage.getItem(LS_LANG) || 'en';
            },
            saveLang: function(langKey) {
                return $window.localStorage.setItem(LS_LANG, langKey);
            }
        };

    });

})(angular.module('vx'));