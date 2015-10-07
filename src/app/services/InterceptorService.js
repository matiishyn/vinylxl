(function (module) {
    'use strict';
    module.factory('Interceptor', function ($window, $injector) {

        return {
            // optional method
            'request': function (config) {
                // do something on success

                // set token on request
                var AuthService = $injector.get('Auth');
                var token = AuthService.getToken();
                if (token) {
                    config.headers['X-Access-Token'] = token;
                }

                return config;
            },

            // optional method
            'requestError': function () {
                // do something on error
            },


            // optional method
            'response': function (response) {

                // Set token
                if (response.data.token) {
                    // save token to service
                    var AuthService = $injector.get('Auth');
                    AuthService.setToken(response.data.token);
                }
                // do something on success
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                var filter = $injector.get('$filter');
                var errorMsg = rejection.data && rejection.data.message ?
                    rejection.data.message :
                    filter('translate')('errorMsgs.serverError');

                // TOKEN EXPIRED - 400, {"message":"Token Expired"}
                if ((rejection.status === 400 && rejection.data.message === "Token Expired") ||
                    (rejection.status === 401 && rejection.config.url.split('/').pop() !== "login")
                ) {
                    // go to login page
                    var AuthService = $injector.get('Auth');
                    AuthService.logout();
                    //$injector.get('$state').go('home.loginA');
                    location.reload(); // TODO what should I do when token expired?
                }

                // do something on error
                var toastr = $injector.get('toastr');
                toastr.error(errorMsg, 'Server Error', {
                    preventDuplicates: true,
                    preventOpenDuplicates: true
                });
            }
        };

    })
      .factory('SeoInterceptor', function ($q, $injector) {
        var $http;

        return {
          'response': function (response) {
            $http = $http || $injector.get('$http');
            var $timeout = $injector.get('$timeout');
            var $rootScope = $injector.get('$rootScope');
            if($http.pendingRequests.length < 1) {
              $timeout(function(){
                if($http.pendingRequests.length < 1){
                  console.log('only once');
                  $timeout(function() {
                    $rootScope.htmlReady();
                  }, 0);
                }
              }, 700);
            }
            return response;
          },

          // optional method
          'responseError': function (rejection) {
            $http = $http || $injector.get('$http');
            return $q.reject(rejection);
          },
          'promise': function (promise) {
            return promise.then(promise, error);
          }

        };

      });

})(angular.module('vx'));
