/**
 * @name : InsightsCtrl
 * @desc: Controller for Insight Charts
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


var setInsightsController = function ( InsightsChartService, ngForceConfig) {
        
        var vm = this;
        
        vm.insightsLength = 0;
        
        vm.showMarket = true;
        
        vm.showResources = false;
        
        vm.chartTitle = ngForceConfig.unitCountry + ' ' + ngForceConfig.unitSegment;
        
        
        vm.setToogleCharts = function( type ){
         
            if(type === 'market'){
                
                vm.showMarket = true;
                vm.showResources = false;
            }
            
            else{
                 vm.showMarket = false;
                vm.showResources = true;
            }
        };
        
            
        
        
    }

    angular
        .module('scm.forecasts')
        .controller('InsightsCtrl', setInsightsController);

    setInsightsController.$inject = [ 'InsightsChartService', 'ngForceConfig' ];

})();