(function (module) {
    'use strict';

    module.directive('listGroupMenu', function ($rootScope, $state) {
        return {
            restrict: 'A',
            link: function (scope, element) {

                activeteCurrentItem($state.current.name);

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    // make active link that match current route
                    activeteCurrentItem(toState.name);
                });

                /*function activateItem() {
                    $(this)
                        .addClass('active')
                        .siblings()
                            .removeClass('active');
                }*/

                function activeteCurrentItem(stateName) {
                    element
                        .find('[ui-sref="' + stateName + '"]')
                        .addClass('active')
                        .siblings()
                        .removeClass('active');
                }
            }
        };
    });


})(angular.module('vx'));