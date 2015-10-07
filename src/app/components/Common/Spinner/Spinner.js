// connected with

(function (module) {
    'use strict';
    
    module.factory('Spinner', function () {
        var spinners = [];
        
        
        function start() {
            if(!spinners.length) {
                $('.loading').fadeIn(100);
            }
            spinners.push(Date.now());
        }
        
        function stop() {
            spinners.pop();
            if(!spinners.length) {
                $('.loading').fadeOut();
            }
            
        }
        
        function stopAll() {
            spinners = [];
            stop();
        }
        
        function onPromise(promise) {
            start();
            if (!promise || !('then' in (promise.$promise || promise))) {
                stop();
                return;
            }
            (promise.$promise || promise).then(stop, function() {
                // on error
                stop();
            });
        }
        
        return {
            start: start,
            stop: stop,
            stopAll: stopAll,
            onPromise: onPromise
        };
    });
    
})(angular.module('vx'));
