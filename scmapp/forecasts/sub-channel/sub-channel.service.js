/**
 * @name : formatserv
 * @desciption : Service for sub channel related functionalities
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

    var setFormatService = function(vfr, REMOTECONTROLLER, ngForceConfig) {

      var modalvalues = {};       

        var getSubChannelDetails = function() {

            var getFormatFunc = vfr.send( REMOTECONTROLLER + '.' + 'getRetailSpendBySubChannel', {}, false );
            
            return getFormatFunc( ngForceConfig.selectedGroupID ).then(function( response ){
                 
                   return (response);
                 
             });  

        };
        
        var setEditModalOptions = function(objschannel) {

            var _this = this;
            
            return {
                animation: true,
                templateUrl: 'modal-format-update.html',
                size: 'md',
                keyboard: false,
                controller: 'EditChannelCtrl',
                controllerAs: 'editchanl',
                bindToController: true,
                resolve: {

                    format: function() { return objschannel; } ,
                    
                    mdata : function(){ return _this.modalvalues; }
                    
                }
            }

        };
        
        var setSubChannelById = function(id) {
          
            var sChannelById =  vfr.send( REMOTECONTROLLER + '.' + 'getSubChannelToUpdate', {}, false );
            
            return sChannelById( id ).then( function(response){
                
                return (response);
                
            });
          
        };
        
        var setInsertFormatDetails = function( objsChannelData ) {
            
            var insFormat =  vfr.send( REMOTECONTROLLER + '.' + 'SubChannelToSave' , {}, false );
            
            return insFormat( ngForceConfig.selectedGroupID, objsChannelData ).then(function(response){
                
                    return (response);
                
            });
            
            
        };

        // Public functions
        this.getSubChannelDetails = getSubChannelDetails;
        
        this.getSubChannelById = setSubChannelById;
        
        this.setEditModalOptions = setEditModalOptions;
        
        this.setInsertFormatDetails = setInsertFormatDetails;
        
        // Primitives
        this.modalvalues = modalvalues;
        

    };
    
    



    angular
        .module('scm.forecasts')
        .service('formatserv', setFormatService);


    setFormatService.$inject = ['vfr', 'REMOTECONTROLLER', 'ngForceConfig'];


})();