/**
 * @name : CustPriorCtrl
 * @desc: Controller for Adjust customer prioritisation
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

/**
 * Wrap everything in an IFFE
 * 
 */

(function () {
    
    'use strict';

    var setCustPrioritisationController = function ( cprserv ) {

        var vm = this;
      
         //Private related functions //
         
         var getPriorityOnLoad = function(){
             
             cprserv.getPriorityDetails()
             
                    .then( function( response ){
                        
                        console.log( response );
                    })
       };
         

         getPriorityOnLoad();

    };

    angular
        .module('scm.customer')
        .controller('CustPriorCtrl', setCustPrioritisationController);

    setCustPrioritisationController.$inject = [ 'cprserv' ];

})();