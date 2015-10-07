(function (module) {
    'use strict';

    module
//        .constant('API_URL', 'https://api.vinylxl.nl/api/v1.0/') // Google cloud
        .constant('API_URL', window.CONFIG.API_URL) // openshift cloud
        .constant('API_URL_v2', window.CONFIG.API_URL_V2) // openshift cloud
        .constant('TOKEN_HEADER', 'X-Access-Token')
        .constant('FE_URL', location.origin + '/')
        .constant('WL_NAME', 'vxWishlist')
        .constant('LS_OBJECT_NAME', 'vxCartItems')
        .constant('LS_TOKEN', 'vxSessionToken')        // variable in LS to store token
        .constant('LS_USERNAME', 'vxSessionUsername')        // variable in LS to store username
        .constant('LS_LANG', 'vxLang')        // variable in LS to store language
        .constant('COVER_IMG', 'https://cdn.vinylxl.nl/')
        .constant('CONFIG', {
            serverDateFormat: 'YYYYMMDD', // parsed by moment() and accepted by server
            displayDateFormat: 'DD/MM/YYYY',
            defaultStartDate: "01/01/1960", // used in filters
            defaultEndDate: "01/01/2020", // used in filters
            dateRangeDivider: ' - ', // used in filters in date range filed,
            releasesMenuItemsVisible: 10 // display only N items in menu 'Releases'. Display 'show more' if there are more items
        })
        .constant('SOCIAL_LINKS', {
            facebook: 'https://www.facebook.com/vinylxl.nl',
            twitter: 'https://twitter.com/vinylxl'
        });

})(angular.module('vx'));
