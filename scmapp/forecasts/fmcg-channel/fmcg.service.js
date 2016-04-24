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

    var setFmcgService = function(vfr, REMOTECONTROLLER, ngForceConfig) {

        var getFmcgDetails = function() {

            var getFmcgFunc = vfr.send(REMOTECONTROLLER + '.' + 'getFMCGForecast', {}, false);

            return getFmcgFunc( ngForceConfig.selectedGroupID ).then(function(response) {

                return (response);

            });

        };


        this.getFmcgDetails = getFmcgDetails;


    }

    angular
        .module('scm.forecasts')
        .service('FmcgService', setFmcgService);


    setFmcgService.$inject = ['vfr', 'REMOTECONTROLLER', 'ngForceConfig'];
})();