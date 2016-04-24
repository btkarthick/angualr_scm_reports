/**
 * @name : cprserv
 * @description : Service for Customer prioritisation related
 * functionality
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setCustomerPriorityController = function (vfr,PRIORITYCONTROLLER) {

        var getPriorityDetails = function(){
            
            var getPriorityFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'StrategicPlannigChart', {}, false);

            return getPriorityFunc().then(function (response) {

                return (response);

            });
            
        };

        
        
        this.getPriorityDetails = getPriorityDetails;

    };

    angular
        .module('scm.customer')
        .service('cprserv', setCustomerPriorityController);


    setCustomerPriorityController.$inject = ['vfr', 'PRIORITYCONTROLLER'];

})();