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

    var setCategoryService = function($q, $timeout, $http, ngForceConfig) {

        var catMockJSON = [
            {
                "statusCode": 200,
                "type": "rpc",
                "tid": 6,
                "ref": false,
                "action": "SCMChannelReport",
                "method": "getChannelToUpdate",
                "result": {
                    "Id": "a1Rf0000000B5NVEA0",
                    "Category_Total_Sales_Actuals__c": 124.6,
                    "Category_Total_Sales_Forecast__c": 128.6,
                    "Category_Total_Sales_CAGR_3Y__c": 0.6,
                    "Category_Total_Sales_CAGR_5Y__c": 0.6,
                    "Category_Total_Sales_Total__c": 5.1,
                    "Mars_Category_Total_Sales_Total__c": 6.2,
                    "Mars_Category_Total_Sales_Forecast__c": 41.2,
                    "Mars_Category_Total_Sales_CAGR_5Y__c": -2.5,
                    "Mars_Category_Total_Sales_CAGR_3Y__c": -2.5,
                    "Mars_Category_Total_Sales_Actuals__c": 46.8,
                    "Mars_Category_Share_PP_Change__c": -5.6,
                    "Mars_Category_Share_Forecast__c": 32.1,
                    "Mars_Category_Share_Actuals__c": 37.6,
                    "RecordTypeId": "012f00000004PrzAAE",
                    "CurrencyIsoCode": "USD"
                }
            }
        ];


        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        var getCategoryDetails = function() {

            return $http.get(JSONURL + '/category-channel.json')
                .then(function(response) {

                    var res = _.first(response.data);

                    return (res.result);
                });

        };

        var getChannelById = function(chId) {

            return function() {

                return $q(function(resolve, reject) {
                    $timeout(function() {

                        resolve(catMockJSON);

                    }, 1000);
                });

            };
        
        };

        var setEditModalOptions = function(catDetails, title) {

            return {
                animation: true,
                templateUrl: 'modal-category-update.html',
                size: 'lg',
                keyboard: false,
                controller: 'EditCatCtrl',
                controllerAs: 'editcat',
                bindToController: true,
                resolve: {

                    format: function() { return catDetails; },

                    title: function() { return title; }
                }
            }

        };
        var setEditModalData = function() {

            return catMockJSON[0].result;
        };

        this.getEditModalData = setEditModalData;
        this.getCategoryDetails = getCategoryDetails;
        this.getEditModalOptions = setEditModalOptions;
        this.getChannelById = getChannelById;

    };


    angular
        .module('scm.forecasts')
        .service('catserv', setCategoryService);

    setCategoryService.$inject = ['$q', '$timeout', '$http', 'ngForceConfig'];

})();