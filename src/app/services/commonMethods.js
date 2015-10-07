(function (module) {
    'use strict';

    module.factory('CommonMethods', function ($window, $modal, $filter, COVER_IMG) {
        /**
         * Returns all artists divided by ', '
         * @param artistsArray
         */
        function getArtists(artistsArray) {
            var result = '';
            // if there are more than one elements
            if (artistsArray && artistsArray[1]) {
                var artists = _.pluck(artistsArray, 'name');
                result = artists.join(', ');
            } else if (artistsArray && artistsArray[0]) {
                result = artistsArray[0].name;
            } else {
                result = '';
            }
            return result;
        }

        /**
         * Returns a string based on product.media and product.formats
         * ex. '12"  33 ? RPM'
         * @param media {string} ex. "12in"
         * @param formats {Array} one of the items contains RPM info that we need
         * @returns {string}
         */
        function getProductFormat(media, formats) {
            var result = "";
            if (media) {
                result += media.replace('in', '\"');
            }

            if (formats && formats[0]) {
                // look for RPM value
                var index = _.findIndex(formats, function (el) {
                    return typeof el === 'string' && el.indexOf('RPM') >= 0;
                });
                result += formats[index] ? ', ' + formats[index] : '';
            }

            return result; // string
        }

        /**
         * used to replace spaces with dashes
         */
        function spaceToDash(text) {
            return text.trim().replace(/\s/g, '-');
        }

        function removeDots(text) {
            return text.trim().replace(/\./g, '');
        }

        function goBack() {
            $window.history.back();
        }

        // TODO remove, use moment instead
        function getDateAgo(date, days) {
            var dateCopy = new Date(date);

            dateCopy.setDate(date.getDate() - days);
            return dateCopy;
        }

        // TODO remove, use moment instead
        function yyyymmdd(date) {
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
        }

        /**
         * usage example: getCoverImg(imagesArr, 'l', '0')
         */
        /*function getCoverImg(images, format, side) {
            var defaultImg = 'assets/ui/default-release.png';

            return images && images[side] ? images[side].links[format] : defaultImg;
        }*/

        function getCoverImg(product_id, format, side) {
            var defaultImg = 'assets/ui/default-release.png',
                imgSrc = defaultImg;

            var sideFormatted = side < 10 ? '_00' + side : '_0' + side;
            if (product_id) {
                imgSrc = COVER_IMG + format + '/' + product_id.substr(0, 7) + '/' + product_id + sideFormatted + '.jpg';
            }
            return imgSrc;
        }

        function openTermsModal() {
            return $modal.open({
                templateUrl: 'app/components/Common/termsModal/termsModal.html',
                controller: 'termsModalCtrl',
                backdrop: 'static',
                size: 'lg'
            });
        }

        function openDefaultModal(title, templateName) {
            return $modal.open({
                templateUrl: 'app/components/Common/defaultModal/defaultModal.html',
                controller: 'defaultModalCtrl',
//                size: 'lg',
                resolve: {
                    title: function () {
                        return $filter('translate')(title);
                    },
                    templateName: function () {
                        return templateName;
                    }
                }
            });
        }

        /**
         * the beatles => ^(?=.*\bthe\b)(?=.*\bbeatles\b).*$
         * @param queryStr
         * @returns {string}
         */
        function toSearchRegex(queryStr) {
            var startStr = '^',
                endStr = '.*$',
                words = queryStr.split(' ');

            // filter out some special cases like ['&',...]
            var specCases = ["&", "-", "/"];
            var filteredWords = words.filter(function (item) {
                return specCases.indexOf(item) === -1;
            });

            // add regexp to every word
            filteredWords.forEach(function (el, i) {
                filteredWords[i] = "(?=.*\\b" + el + "\\b)";
            });

            return startStr + filteredWords.join('') + endStr;
        }

        return {
            getArtists: getArtists,
            openTermsModal: openTermsModal,
            openDefaultModal: openDefaultModal,
            getProductFormat: getProductFormat,
            spaceToDash: spaceToDash,
            removeDots: removeDots,
            goBack: goBack,
            getDateAgo: getDateAgo,
            yyyymmdd: yyyymmdd,
            toSearchRegex: toSearchRegex,
            getCoverImg: getCoverImg
        };
    });

})(angular.module('vx'));
