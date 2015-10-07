(function (module) {
    'use strict';
    module.factory('Auth', function ($resource, API_URL, $window, toastr, $filter,
                                     LS_TOKEN, LS_USERNAME, Wishlist) {

        var resource = $resource(API_URL, {}, {
            login: {
                url: API_URL + 'login',
                method: 'POST'
            },
            logout: {},
            signup: {
                url: API_URL + 'signup',
                method: 'POST'
            },
            getProfile: {
                url: API_URL + 'profile',
                method: 'GET'
            },
            updateProfile: {
                url: API_URL + 'profile',
                method: 'PUT'
            }
        });

        function login(username, password, staySignedIn) {
            if (!username || !password) {
                return false;
            }

            var me = this;

            var promise = resource.login({
                username: username,
                password: password
            });

            promise.$promise.then(function (data) {

                me.token = data.token;
                me.username = username;

                staySignedIn ? me.saveUserLocally.call(me) : false;

                Wishlist.isAuth = true;
                Wishlist.getProducts();
            });

            return promise;
        }

        function logout() {
            $window.localStorage.removeItem(LS_USERNAME);
            $window.localStorage.removeItem(LS_TOKEN);
            this.username = null;
            this.token = null;
            this.profile = {};
            Wishlist.isAuth = false;
            Wishlist.getProducts();
        }

        function signup(username, password) {
            if (!username || !password) {
                return false;
            }

            var me = this;

            // clear token
            this.clearToken();

            var promise = resource.signup({
                username: username,
                password: password,
                state: $window.location.origin + '/registration/address?token={{token}}'
            });

            promise.$promise.then(function () {
                me.username = username;
                me.saveUserLocally.call(me);
                Wishlist.isAuth = true;
            });

            return promise;
        }

        function saveUserLocally() {
            // can be saved in cookie
            // save in LS
            $window.localStorage.setItem(LS_USERNAME, this.username);
            // token is saved in another method
        }

        function autoLogin() {
            // retrieve username and token
            var username = $window.localStorage.getItem(LS_USERNAME);
            var token = $window.localStorage.getItem(LS_TOKEN);
            if (username && token) {
                this.username = username;
                this.token = token;

                this.getProfile();

                Wishlist.isAuth = true;
                Wishlist.getProducts();
            }
        }

        function getProfile() {
            if (!Object.keys(this.profile).length) {
                var promise = resource.getProfile();
                this.profile = promise;
                return promise;
            } else {
                return this.profile;
            }
        }

        function getToken() {
            var token = null;
            if (this.token) {
                token = this.token;
            } else {
                token = $window.localStorage.getItem(LS_TOKEN);
            }
            return token;
        }

        /**
         * Save token as local variable and localStorare
         * @param token {string}
         */
        function setToken(token) {
            this.token = token;
            $window.localStorage.setItem(LS_TOKEN, token);
            return true;
        }

        function clearToken() {
            this.token = null;
            $window.localStorage.removeItem(LS_TOKEN);
            return true;
        }

        /**
         * Set username as local variable manually
         * can be set from parameter or from localStorage, it depends on last parameter
         * @param username {string}
         * @param fromLs {boolean} if true then get value from LocalStorage and set to object
         * @returns {boolean}
         */
        function setUsername(username, fromLs) {
            this.username = fromLs ? $window.localStorage.getItem(LS_USERNAME) : username;
            return true;
        }

        function getUsername() {
            return this.username || $window.localStorage.getItem(LS_USERNAME);
        }

        /**
         * Should return boolean value which will determine if user is logged in
         */
        function isLoggedIn() {
            // user is logged in when has username and token set
            return this.getUsername() && this.getToken();
        }

        return {

            username: null,
            token: null,

            profile: {}, // object with addresses

            // methods
            resource: resource,
            login: login,

            getProfile: getProfile,

            autoLogin: autoLogin,

            logout: logout,
            signup: signup,

            saveUserLocally: saveUserLocally,

            getToken: getToken,
            setToken: setToken,
            clearToken: clearToken,

            setUsername: setUsername,
            getUsername: getUsername,

            isLoggedIn: isLoggedIn
        };

    });

})(angular.module('vx'));
