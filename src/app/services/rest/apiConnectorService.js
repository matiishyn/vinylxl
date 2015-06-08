(function(module) {
    'use strict';

    module.factory('APIConnector', function($resource, API) {
        function APIConnector(config) {
            this.route = config.route || '';
        }

        APIConnector.prototype.prepareParams = function(ext) {
            this.params = {
                route: this.route
            };

            if(ext) {
                angular.extend(this.params, ext);
            }
        };

        APIConnector.prototype.getById = function(id) {
            this.prepareParams({id: id}); 

            return new API.getById(
                this.params
            ).$promise;
        };

        APIConnector.prototype.getList = function() {
            this.prepareParams();

            return new API.get(
                this.params
            ).$promise;
        };

        return APIConnector;
    });

})(angular.module('vx'));
