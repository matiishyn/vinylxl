'use strict';
!(function (window, document, undefined) {
  var getModule = function (angular) {
    return angular.module('seo', [])
      .run([
        '$rootScope',
        function ($rootScope) {
          $rootScope.htmlReady = function () {
            $rootScope.$evalAsync(function () { // fire after $digest
              console.log('window.callPhantom', window.callPhantom);
              setTimeout(function () { // fire after DOM rendering
                if (typeof window.callPhantom === 'function') {
                  window.callPhantom();
                }
              }, 700);
            });
          };
        }
      ]);
  };
  if (typeof define === 'function' && define.amd) {
    define(['angular'], getModule);
  } else {
    getModule(angular);
  }
})(window, document);
