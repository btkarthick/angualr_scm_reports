/**
 * @name : catserv
 * @description : setCategoryService for all category forecasts related functionalities
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {

    'use strict';

    var setCategoryService = function(vfr, REMOTECONTROLLER, ngForceConfig) {

         var modalvalues = {};     

        var getCategoryDetails = function() {

            var getCatFunc = vfr.send(REMOTECONTROLLER + '.' + 'getRetailData', {}, false);

            return getCatFunc( ngForceConfig.selectedGroupID ).then(function(response) {

                return (response);

            });

        };
        
        var getChannelById = function( chId ){
           
            var channelByID = vfr.send( REMOTECONTROLLER + '.' + 'getChannelToUpdate' , {}, false );
            
            return channelByID( chId ).then(function(response){
                
                return (response);
                
            });
            
        };
        
        var setInsertCatDetails = function( objDetails ){
            
            var insCat = vfr.send( REMOTECONTROLLER + '.' + 'ChannelToSave' , {}, false );
            
            return insCat( ngForceConfig.selectedGroupID, objDetails ).then(function(response){
                
                    return (response);
                
            });
        };


        var setEditModalOptions = function(catDetails) {

            var _this = this;

            return {
                animation: true,
                templateUrl: 'modal-category-update.html',
                size: 'lg',
                keyboard: false,
                controller: 'EditCatCtrl',
                controllerAs: 'editcat',
                bindToController: true,
                resolve: {

                    format: function() { return catDetails; }
                }
            }

        };

      
        // Public functions
        this.getCategoryDetails = getCategoryDetails;
        this.getChannelById = getChannelById;
        this.getEditModalOptions = setEditModalOptions;
        this.setInsertCatDetails = setInsertCatDetails;
        
        // Primitives
        this.modalvalues = modalvalues;

    };


    angular
        .module('scm.forecasts')
        .service('catserv', setCategoryService);

    setCategoryService.$inject = ['vfr', 'REMOTECONTROLLER', 'ngForceConfig'];

})();