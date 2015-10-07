(function (module) {
    'use strict';

    /**
     * Service to fill menu dropdown with items
     */
    module.service('MenuService', function ($resource, API_URL, CONFIG) {
        return $resource(API_URL + 'genres/', {}, {
            getMainGenres: {
                method: 'GET',
                //url: API_URL + 'genres?_q=freq,main_genre_key&_a=f,mgk&_f=­g&_s=f:-1&mgk:exists=false',
                //url: API_URL + 'main-genres?_q=freq,genres&_a=f,g&_f=-g&_s=f:-1',
                url: API_URL + 'genres?_q=freq,main_genre_key,genres&_a=f,mgk,g&_f=-g&_s=f:-1&mgk:exists=false',
                isArray: true
            },
            getGenres: {
                method: 'GET',
                //url: API_URL + 'genres?_q=freq,genres&_a=f,g&_f=-g&_s=f:-1',
                url: API_URL + 'genres?_q=freq,main_genre_key,genres&_a=f,mgk,g&_f=-g&_s=f:-1&mgk:exists=true',
                isArray: true
            },
            getStyles: {
                method: 'GET',
                url: API_URL + 'styles?_q=freq&_a=f&_s=f:-1',
                isArray: true
            },
            getLabels: {
                method: 'GET',
                url: API_URL + 'labels?_q=freq&_a=f&_s=f:-1',
                isArray: true
            },
            getReleases: {
                url: API_URL + 'releases?_q=key,descr,active&_a=k,d,a&_s=k:-1&limit=' +
                (CONFIG.releasesMenuItemsVisible + 1) + '&a:eq=true&_f=k,d',
                isArray: true
            },
            getSpecials: {
                url: API_URL + 'specials/?_q=_id,title,descr,active&_a=id,t,d,a&a:eq=true&_f=id,t',
                isArray: true
            }
        });
    });

})(angular.module('vx'));
