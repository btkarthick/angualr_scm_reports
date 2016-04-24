/**
 * @name : ResOutCtrl
 * @desc: Controller for bold resource choices Output
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setResourceOutputController = function (resInpserv) {

        var vm = this;
        
        var questions = {};
        
        vm.qn = {};
     
        // Private functions Starts //
        
        var setOutputDataOnLoad = function(){
            
            resInpserv.getQuesEntities()
            
                      .then( outputDataSuccess, outputDataFailure );
            
        };
        
        var outputDataSuccess = function( response ){
            
            questions = response;
            
            vm.qn = angular.copy(questions);
            
            console.log( vm.qn );
            
        };
        
        var outputDataFailure = function(){
            
            
        };
        
        // End of Private functions //
        
        
        // Call the function to load data
        setOutputDataOnLoad();

    };

    angular
        .module('scm.bold.resource')
        .controller('ResOutCtrl', setResourceOutputController);

    setResourceOutputController.$inject = ['resourceInputserv'];

})();