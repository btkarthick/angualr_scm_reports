/**
 * @name : scm.forecasts
 * @desc :  Application start file for SCM forecasts module
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
    
    var setRouteConfig = function ($stateProvider, $urlRouterProvider, ngForceConfig) {


        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/fmcg-channel");

        $stateProvider
       
        .state('fmcg', STATECONFIG.fmcg)
      
        .state('category', STATECONFIG.category)

        .state('format', STATECONFIG.format)

        .state('insights', STATECONFIG.insights)

    }



    angular.module('scm.forecasts', [
        'ui.router',
        'ngForce',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ngMessages',
        'forecasts.templates',
        'scm.filters',
        'scm.services'

    ])
        .config(setRouteConfig)
        .constant( 'REMOTECONTROLLER', 'SCMChannelReport' )
        .constant('resDataTable',new Array());

    setRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ngForceConfig']


})();