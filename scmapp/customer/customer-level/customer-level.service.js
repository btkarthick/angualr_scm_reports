/**
 * @name : custLevelServ
 * @description : setCategoryService for all category forecasts related functionalities
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setCustomerLevelService = function (vfr, PRIORITYCONTROLLER, ngForceConfig) {

        var modalvalues = {};

        var getCustomerDetails = function () {

            var getCustFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'ShowCustomerData', {}, false);

            return getCustFunc( ngForceConfig.selectedGroupID ).then(function (response) {

                return (response);

            });

        };

        var setAddCustDetails = function (objDetails) {

            var insCat = vfr.send(PRIORITYCONTROLLER + '.' + 'InsertCustomerData', {}, false);

            return insCat( ngForceConfig.selectedGroupID, objDetails).then(function (response) {


                return (response);

            });
        };

        var setEditCustDetails = function (objDetails) {

            var updCust = vfr.send(PRIORITYCONTROLLER + '.' + 'UpdateCustomerData', {}, false);

            return updCust( ngForceConfig.selectedGroupID, objDetails).then(function (response) {


                return (response);

            });
        };

        var getCustomerList = function () {

            var getCustListFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'FetchInitialData', {}, false);

            return getCustListFunc( ngForceConfig.selectedGroupID ).then(function (response) {

                return (response);

            });

        };


        var getCustTransactTotal = function () {

            var getCustTransTotFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'CustomerTransactionTotal', {}, false);

            return getCustTransTotFunc( ngForceConfig.selectedGroupID ).then(function (response) {

                return (response);

            });

        };

        var getEditCustomerData = function (custTransId) {

            var getEditCustDataFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'EditCustomerData', {}, false);

            return getEditCustDataFunc(custTransId).then(function (response) {

                return (response);

            });

        };

        var updateCustomerContribution = function (contributionId) {
            
            var getUpdCustContrFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'UpdateCustomerContribution', {}, false);

            return getUpdCustContrFunc( ngForceConfig.selectedGroupID, contributionId).then(function (response) {

                return (response);

            });
        };

        var setCustomerList = function () {
            
            return ngForceConfig.allCustomers;
        };

        var setAddCustModalOptions = function (customerDetails, customerList, customerEntities, custTransTotal) {

            return {
                animation: true,
                templateUrl: 'modal-add-customer.html',
                size: 'lg',
                keyboard: false,
                controller: 'addCustCtrl',
                controllerAs: 'addCust',
                bindToController: true,
                resolve: {
                    customerDetails: function () { return customerDetails; },
                    customerList: function () { return customerList; },
                    customerEntities: function () { return customerEntities; },
                    custTransTotal: function () { return custTransTotal; }
                }
            }

        };

        var setEditCustModalOptions = function (editCustomerData, custTransTotal, stratergicData) {

            return {
                animation: true,
                templateUrl: 'modal-edit-customer.html',
                size: 'lg',
                keyboard: false,
                controller: 'editCustCtrl',
                controllerAs: 'editCust',
                bindToController: true,
                resolve: {
                    editCustomerData: function () { return editCustomerData; },
                    custTransTotal: function () { return custTransTotal; },
                    stratergicData: function () { return stratergicData; }
                }
            }

        };

        this.getCustomerDetails = getCustomerDetails;

        this.setEditCustDetails = setEditCustDetails;

        this.getCustomerList = setCustomerList;

        this.getAddCustModalOptions = setAddCustModalOptions;

        this.getEditCustModalOptions = setEditCustModalOptions;

        this.setAddCustDetails = setAddCustDetails;

        this.getCustomerList = getCustomerList;

        this.getEditCustomerData = getEditCustomerData;

        this.getCustTransactTotal = getCustTransactTotal;

        this.updateCustomerContribution = updateCustomerContribution;
    };


    angular
        .module('scm.customer')
        .service('custLevelServ', setCustomerLevelService);

    setCustomerLevelService.$inject = ['vfr', 'PRIORITYCONTROLLER', 'ngForceConfig'];

})();