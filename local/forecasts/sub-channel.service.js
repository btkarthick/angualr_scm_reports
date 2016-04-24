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

    var setFormatService = function($http, ngForceConfig) {



        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        var getSubChannelDetails = function() {

            return $http.get(JSONURL + '/sub-channel.json').then(function(response) {

                var res = _.first(response.data);

                return (res.result);
            });

        };

        var setEditSaveData = function(id) {
            return {
                "id": "a1Rf0000000B57LEAS",
                "sales": [
                    "101",
                    "201",
                    "302",
                    "221",
                    "456"
                ]
            };
        };

        var setEditModalData = function() {
            return {
                
                "Id": "a1Rf0000000B57LEAS",
                "Mars_Channel_Total_Spent__c": 8003,
                "Mars_Trade_Spend__c": 203,
                "Mars_Customer_Promotion_Spend__c": 9003,
                "Mars_DandE__c": 103,
                "Mars_Overhead__c": 303,

            };
        };


        var setEditModalOptions = function(channelDetails) {

            return {
                animation: true,
                templateUrl: 'modal-format-update.html',
                size: 'md',
                keyboard: false,
                controller: 'EditChannelCtrl',
                controllerAs: 'editchanl',
                bindToController: true,
                resolve: {

                    format: function() { return channelDetails; }
                }
            }

        };

        this.getSubChannelDetails = getSubChannelDetails;

        this.setEditModalOptions = setEditModalOptions;

        this.setEditSaveData = setEditSaveData;

        this.setEditModalData = setEditModalData;

    };



    angular
        .module('scm.forecasts')
        .service('formatserv', setFormatService);


    setFormatService.$inject = ['$http', 'ngForceConfig'];


})();