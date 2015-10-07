(function (module) {
    'use strict';

    module.filter('searchOpts', function ($filter) {
        return function (input) {
            var result = '';
            switch (input) {
                case 'all':
                    result = $filter('translate')('searchElement.AllLbl');
                    break;
                case 'artists.name':
                    result = $filter('translate')('searchElement.ArtistLbl');
                    break;
                case 'title':
                    result = $filter('translate')('searchElement.TitleLbl');
                    break;
                case 'genre.descr':
                    result = $filter('translate')('searchElement.GenreLbl');
                    break;
                case 'style':
                    result = $filter('translate')('searchElement.StyleLbl');
                    break;
                default:
                    result = 'All';
            }
            return result;
        };
    });

})(angular.module('vx'));