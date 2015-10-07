(function (module) {
    'use strict';
    module.directive('translateDropdown', function ($translate, LangService) {
        return {
            templateUrl: 'app/components/Main/translateDropdown/translateDropdown.html',
            restrict: 'E',
            replace: true,
            controllerAs: 'tr',
            bindToController: true,
            controller: function () {
                var vm = this;
                vm.currentLang = LangService.getLang();

                vm.selectLanguage = function (lang) {
                    vm.currentLang = lang;
                    $translate.use(lang);
                    // save new language to LS
                    LangService.saveLang(lang);
                };
            }
        };
    });

})(angular.module('vx'));