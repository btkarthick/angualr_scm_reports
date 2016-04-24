/**
 * @name : FmgService
 * @desc : Service for communicating to the back end
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

/**
 * Wrap everything in an IFFE
 * 
 */

(function() {

    'use strict';

    var setFmcgService = function($http, ngForceConfig) {

        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        var getFmcgDetails = function() {

            return $http.get(JSONURL + '/fmcg-channel.json')
                .then(function(response) {
                    var res = _.first(response.data);

                    return (res.result);
                });
        };


        this.getFmcgDetails = getFmcgDetails;


    }

    angular
        .module('scm.forecasts')
        .service('FmcgService', setFmcgService);


    setFmcgService.$inject = ['$http', 'ngForceConfig'];
})();