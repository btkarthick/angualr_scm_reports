/**
 * @name : FmgCtrl
 * @desc: Controller for Fmg listing and other functionalities
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


var setFmcgController = function ( FmcgService  ) {
        
        var vm = this;
        
       vm.fmcgForecast = [];
       
       
       
       // Priavte functions starts
       
       var getFmcgForecastOnLoad = function () {
           
           FmcgService.getFmcgDetails()
                      .then( fmcgForecastSuccess )
           
       };
       
       
       var fmcgForecastSuccess = function ( response ) {
           
           vm.fmcgForecast = response;
           
           
       }
       
       // Call Load functions
       
       getFmcgForecastOnLoad();
     
    };

    angular
        .module('scm.forecasts')
        .controller('FmcgCtrl', setFmcgController);

    setFmcgController.$inject = [ 'FmcgService' ];

})();