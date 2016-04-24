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
        'bold-resource.templates',
        'scm.filters',
        'scm.services',
        'firebase'
      
    ])
        .config(setRouteConfig)
        .constant ( 'PRIORITYCONTROLLER', 'SCMBoldResource' )
        .constant('resDataTable',new Array())
        .constant( 'FirebaseUrl', "https://scm-app-db.firebaseio.com/" )
        
    setRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ngForceConfig'];


})();