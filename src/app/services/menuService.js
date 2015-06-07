(function(module) {
    'use strict';

    module.service('MenuItems', function() {
        return [{
            name: 'Home',
            link: '#'
        }, {
            name: 'About',
            link: '#'
        }, {
            name: 'Contacts',
            link: '#'
        }];
    });

})(angular.module('vx'));