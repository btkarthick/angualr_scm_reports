/**
 * @name : resourceserv
 * @description : setCategoryService for all category forecasts related functionalities
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {
    
    'use strict';

    var setResourcesService = function(vfr, RESOURCESCONTROLLER, ngForceConfig) {
        
        var getCustomerResData = function() {

            var getCustRes = vfr.send(RESOURCESCONTROLLER + '.' + 'ResourcePlanningData', {}, false);

            return getCustRes( ngForceConfig.selectedGroupID ).then(function(response) {

                return (response);

            });

        };
        
        
        var calculateEmptyRowsLength = function( leftLength, rightLength ){
            
            var objRows = { leftRows : 0 , rightRows : 0 }
            
            leftLength = parseInt(leftLength);
            
            rightLength = parseInt(rightLength);
            
            if( leftLength > rightLength ){
                
                objRows.rightRows = (leftLength - rightLength);
            }
            
            else if( leftLength < rightLength ) {
                
                objRows.leftRows = (rightLength - leftLength);
            }
            
            return objRows;
        };
        

        this.getCustomerResData = getCustomerResData;
        this.getEmptyRowsCount = calculateEmptyRowsLength;

    }


    angular
        .module('scm.bold.resource')
        .service('resourceserv', setResourcesService);

    setResourcesService.$inject = ['vfr', 'RESOURCESCONTROLLER', 'ngForceConfig'];
})();