/**
 * @name : custLevelServ
 * @description : setCategoryService for all category forecasts related functionalities
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {

    'use strict';

    var setCustomerLevelService = function() {


        var setCustomerEntities = function() {
            return {
                "Unit_Country__c": "",
                "Unit_Segment__c": "",
                "SCM_Customer__c": "",
                "SCM_Customer_Strategic__c": "",
                "SCM_Customer_Contribution__c": "",
                "FMCG_Forecast__c": "",
                "FMCG_Actual__c": "",
                "Overall_Actual__c": "",
                "Overall_Forecast__c": "",
                "Overall_Total__c": "",
                "Mars_Actual__c": "",
                "Mars_Forecast__c": "",
                "Mars_Total__c": "",
                "Contribution_Actual__c": "",
                "Contribution_Forecast__c": "",
                "Contribution_Total__c": "",
                "Trade__c": "",
                "Other__c": "",
                "Other_Customer__c": false,
            };
        };

        var setCustomerList = function() {
            return [
                {
                    "id": "asdaeqw12213",
                    "customer": "walmart"
                },
                {
                    "id": "asdaeqw12213",
                    "customer": "publix"
                },
                {
                    "id": "asdaeqw12213",
                    "customer": "tesco"
                },
                {
                    "id": "asdaeqw12213",
                    "customer": "cvs"
                },
                
            ];
        };
        
        var setAddCustModalOptions = function(customerList, customerEntities) {

            return {
                animation: true,
                templateUrl: 'customers/modal-add-customer.html',
                size: 'lg',
                keyboard: false,
                controller: 'addCustCtrl',
                controllerAs: 'addCust',
                bindToController: true,
                resolve: {

                    customerList: function() { return customerList; },
                    customerEntities: function(){return customerEntities;}
                }
            }

        };

        this.getCustomerList = setCustomerList;
        
        this.getAddCustModalOptions = setAddCustModalOptions;

        this.getCustomerEntities = setCustomerEntities;

    };


    angular
        .module('scm.customer')
        .service('custLevelServ', setCustomerLevelService);

    setCustomerLevelService.$inject=[];

})();