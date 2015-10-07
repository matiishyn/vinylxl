'use strict';

angular.module('vx', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ui.select', // https://github.com/angular-ui/ui-select
    'toastr', // https://github.com/Foxandxss/angular-toastr
    'angular-flexslider', // https://github.com/thenikso/angular-flexslider
    'pascalprecht.translate', // https://angular-translate.github.io/
    'ngAutocomplete', // https://github.com/wpalahnuk/ngAutocomplete
    'angularUtils.directives.dirPagination', // http://www.michaelbromley.co.uk/blog/108/paginate-almost-anything-in-angularjs
    'seo'
])
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/main/main.html',
                controller: 'MainCtrl',
                resolve: {
                    products: function (Cart, Auth) {
                        Auth.autoLogin();
                        Cart.restoreCart();
                    },
                    Slides: function (Sales) {
                        return Sales.getList();
                    }
                }
            })

            //product results
            .state('home.products', {
                abstract: true,
                url: 'products/',
                template: '<ui-view/>'
            })
            // Search
            .state('home.products.search', {
                url: 'search::searchQuery?type',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {searchQuery: null, type: null}
            })
            // =============== MENU ==============
            .state('home.products.menu', {
                url: 'products/?type&key&title',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {type: null, key: null, title: null}
            })
            // ============== SPECIALS ======================
            .state('home.products.sales', {
                url: 'sales?type&id&title',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {type: null, id: null, title: null}
            })
            .state('home.products.newReleases', {
                url: 'new-releases',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {searchQuery: null}
            })
            .state('home.products.expectedReleases', {
                url: 'expected-releases',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {searchQuery: null}
            })
            .state('home.products.midPrice', {
                url: 'mid-price',
                templateUrl: 'app/views/products/products.html',
                controller: 'ProductsCtrl',
                params: {searchQuery: null}
            })

            .state('home.product', {
                url: 'products/:title/:id',
                templateUrl: 'app/views/product/product.html',
                controller: 'ProductCtrl',
                params: {id: null},
                resolve: {
                    product: function (ProductsService, $stateParams) {
                        return ProductsService.get({id: $stateParams.id});
                    }
                }
            })

            // Cart and checkout process
            .state('home.cart', {
                url: 'cart',
                templateUrl: 'app/views/cart/cart.html',
                controller: 'CartCtrl'
            })
            .state('home.checkoutDetails', {
                url: 'checkout/details',
                templateUrl: 'app/views/checkoutDetails/checkoutDetails.html',
                controller: 'CheckoutDetailsCtrl'
            })
            .state('home.payment', {
                url: 'checkout/payment/:order_id?selectedCountry&token',
                templateUrl: 'app/views/paymentPage/paymentPage.html',
                controller: 'PaymentPageCtrl',
                params: {order_id: null, selectedCountry: null, token: null},
                resolve: {
                    Order: function (Customer, $stateParams) {
                        return Customer.getOrderById($stateParams.token).get({id: $stateParams.order_id});
                    }
                }
            })
            .state('home.paymentConfirmation', {
                url: 'checkout/payment-confirmation?orderId&orderStatusId&paymentSessionId',
                templateUrl: 'app/views/paymentConfirmationPage/paymentConfirmationPage.html',
                controller: 'PaymentConfirmationPageCtrl'
            })

            .state('home.wishlist', {
                url: 'wishlist',
                templateUrl: 'app/views/wishlist/wishlist.html',
                controller: 'WishlistCtrl',
                controllerAs: 'wishlist'
            })

            // USER
            // page with forms Login and Registration
            .state('home.loginA', {
                url: 'login/?redirect',
                templateUrl: 'app/views/User/loginA/login.html',
                controller: 'LoginCtrl',
                params: {redirect: null}
            })
            // Registration, Step 1 - page with info that email was sent
            .state('home.registrationEmailWasSent', {
                url: 'registration/email',
                templateUrl: 'app/views/User/registration1/registration1.html',
                controller: 'registration1Ctrl'
            })
            /*.state('home.loginB', {
                url: 'login/user-details?redirect',
                templateUrl: 'app/views/User/loginB/loginB.html',
                controller: 'LoginBCtrl',
                params: {redirect: null}
            })*/
            // Registration, Step 2 - user comes here after activation email
            .state('home.userAddress', {
                url: 'registration/address?expires&token&name&err&social&redirect',
                templateUrl: 'app/views/User/registrationAddress/registrationAddress.html',
                controller: 'RegistrationAddressCtrl'
            })
            // Registration, Step 3 - Thanks for registration window
            .state('home.thanksForRegistration', {
                url: 'signup/confirmation?redirect',
                templateUrl: 'app/views/User/signupConfirmation/signupConfirmation.html',
                controller: 'signupConfirmationCtrl',
                params: {redirect: null},
                data: {userHasToBeLoggedIn: true}
            })
            .state('home.loginConfirmation', {
                url: 'login/confirmation/?redirect',
                templateUrl: 'app/views/User/loginConfirmation/loginConfirmation.html',
                controller: 'loginConfirmationCtrl',
                params: {redirect: null},
                resolve: {
                    profile: function (Auth) {
                        return Auth.getProfile();
                    }
                },
                data: {userHasToBeLoggedIn: true}
            })

            // restorePassword
            .state('home.restorePassword', {
                url: 'restorePassword?recoveryToken',
                templateUrl: 'app/views/User/restorePassword/restorePassword.html',
                controller: 'restorePasswordCtrl',
                params: {recoveryToken: null}
            })

            .state('home.profile', {
                url: 'profile',
                templateUrl: 'app/views/User/profile/profile.html',
                controller: 'profileCtrl',
                resolve: {
                    profile: function (Auth) {
                        return Auth.getProfile();
                    }
                },
                data: {userHasToBeLoggedIn: true}
            })
            .state('home.profile.personalInfo', {
                url: '/personal-info',
                templateUrl: 'app/views/User/personalInfo/personalInfo.html',
                controller: 'personalInfoCtrl'
            })
            .state('home.profile.orderHistory', {
                url: '/order-history',
                templateUrl: 'app/views/User/orderHistory/orderHistory.html',
                controller: 'orderHistoryCtrl',
                resolve: {
                    Orders: function (Customer) {
                        return Customer.resource.query();
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

        //$locationProvider.html5Mode(true);//.hashPrefix('!');
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

    // Translations - http://angular-translate.github.io/
    .config(function ($translateProvider) {
        $translateProvider
            .preferredLanguage('en')
            .useStaticFilesLoader({
                prefix: '/languages/',
                suffix: '.json'
            })
            .useSanitizeValueStrategy('')
            .fallbackLanguage('en');
    })

    // HTTP Interceptors
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('Interceptor', 'SeoInterceptor');
    })

    // Selecting theme for Select2 component
    .config(function (uiSelectConfig) {
        uiSelectConfig.theme = 'select2';
    })
    .run(function ($translate, LangService) {

        // get saved preferred language and set it to $translate
        $translate.use(LangService.getLang());
    })

    // Setting up configuration for protecting opening page by unregistered user
    .run(function ($rootScope, $state, Auth) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var isAuthenticationRequired = toState.data && toState.data.userHasToBeLoggedIn;
            if (isAuthenticationRequired && !Auth.isLoggedIn()) {
                event.preventDefault();
                $state.go('home.loginA');
            }
        });
    });

// running jQuery plugins
$(function () {
    // https://github.com/markgoodyear/scrollup
    $.scrollUp({
        scrollText: ''
    });
});
