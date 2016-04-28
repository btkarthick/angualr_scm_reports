/**
 * @name : scm.bold.resource
 * @desc : Application start file for SCM bold resource choices module
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
        $urlRouterProvider.otherwise("/resource_input");

        $stateProvider
       
        .state('resource_input', STATECONFIG.resource_input)
        
        .state('resource_choices', STATECONFIG.resource_choices)
        
        .state('resource_output', STATECONFIG.resource_output)
        

    };


    angular.module('scm.bold.resource', [
        'ui.router',
        'ngForce',
        'ngAnimate',
        'ngSanitize',
        'ngMessages',
        'ui.bootstrap',
        'bold-resource.templates',
        'scm.filters',
        'scm.services'

    ])
        .config(setRouteConfig)
        .constant ( 'RESOURCESCONTROLLER', 'SCMBoldResource' )
        .constant('resDataTable',new Array());
        
    setRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ngForceConfig'];


})();