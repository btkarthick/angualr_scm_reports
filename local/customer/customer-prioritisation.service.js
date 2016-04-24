/**
 * @name : cprserv
 * @description : Local Service for Customer prioritisation related
 * functionality
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setCustomerPriorityController = function ($http, ngForceConfig) {

        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        var getPriorityDetails = function () {

            return $http.get(JSONURL + '/priority_customer.json')
                .then(function (response) {

                    var res = _.first(response.data);

                    return (res.result);
                });

        };



        this.getPriorityDetails = getPriorityDetails;

    };

    angular
        .module('scm.customer')
        .service('cprserv', setCustomerPriorityController);


    setCustomerPriorityController.$inject = ['$http', 'ngForceConfig'];

})();