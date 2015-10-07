(function (module) {
    'use strict';
    // https://www.youtube.com/watch?v=fTWQxCoYgXI => https://www.youtube.com/embed/fTWQxCoYgXI
    module.filter('youtubeEmbed', function() {
        return function(val) {
            val = val.replace('http:', '');
            return val.replace('watch?v=', 'embed/');
        };
    });
})(angular.module('vx'));