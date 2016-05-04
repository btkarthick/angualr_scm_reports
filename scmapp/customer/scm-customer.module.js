/**
 * @name : scm.customer
 * @desc :  Application start file for SCM customer module
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
        $urlRouterProvider.otherwise("/customers-listing");

        $stateProvider
       
        .state('customers_listing', STATECONFIG.customers_listing)
        
        .state( 'customer_insights', STATECONFIG.customer_insights)
        
        .state ( 'adjust_customer',  STATECONFIG.adjust_customer)

    };


    angular.module('scm.customer', [
        'ui.router',
        'ngForce',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ngMessages',
        'customer.templates',
        'scm.filters',
        'scm.services'

    ])
        .config(setRouteConfig)
        .constant ( 'PRIORITYCONTROLLER', 'SCMCustomerPrioritisation' )
        .constant('resDataTable',new Array());

    setRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ngForceConfig']


})();