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

    var setCustPrioritisationController = function (cprserv, CustProfitChartService, $timeout) {

        var vm = this;

        vm.showSuccess = false;
        
        vm.showFailure = false;
        
        vm.resetFlag = false;
        
        vm.priorityData = [];

        
        vm.setResetGraph = function(){
            
            vm.resetFlag = true;
        };
        
        vm.saveGraphChanges = function(){
                     
            cprserv.setSaveGraphPostions( vm.priorityData )
                   .then( saveGraphSuccess, saveGraphFailure );
          
        };

        
        //Private related functions starts //
       
        var saveGraphSuccess = function( response ){
            
                if( response.length > 0 ){
                    
                    vm.showSuccess = true;
                    
                    $timeout(function(){
                        
                         vm.showSuccess = false;
                        
                    },5000);
                }
        };

     
        var saveGraphFailure = function(){
            
        };
    };

    angular
        .module('scm.customer')
        .controller('CustPriorCtrl', setCustPrioritisationController);

    setCustPrioritisationController.$inject = ['cprserv', 'CustProfitChartService', '$timeout'];

})();