/**
 * @name : EditCatCtrl
 * @desc : A controller for edit category functionality
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


    var setAddCustomerController = function ($scope, custLevelServ, $uibModalInstance, rawCustomerDetails, customerEntities, custTransTotal, customerDetails) {

        var vm = this;

        var customerList = [];

        var rawCustomerList = rawCustomerDetails.customerData;

        var filterAddedCustomers = function () {

            _.forEach(rawCustomerList, function (customer) {

                var res = customer.SCM_Customer__r;
                var isPresent = false;

                _.forEach(customerDetails.custTransactions, function (customer, i) {
                    if (customer.SCM_Customer__r.Id === res.Id)
                        isPresent = true;

                });

                if (!isPresent)
                    customerList.push({ "Id": res.Id, "customer": res.Name });
            });

        };

        var validateCustomerName = function () {

            if (vm.customerName === '0') {
                $scope.addCustomerForm.$setValidity('customer', false);
                return true;
            }

            else {
                $scope.addCustomerForm.$setValidity('customer', true);
                return false;
            }
        };

        filterAddedCustomers();

        vm.customerList = angular.copy(customerList);

        vm.custEntities = angular.copy(customerEntities);

        vm.custEntities.Unit_Country_Txt__c = rawCustomerDetails.currentUserSegment.Country__c;

        vm.custEntities.Unit_Segment_TXT__c = rawCustomerDetails.currentUserSegment.Segment__c;

        vm.customerName = '0';

        vm.checkOther = function (custName) {

            if (_.lowerCase(custName) === 'others') {
                vm.custEntities.Other_Customer__c = true;
                vm.disableOtherCheck = true;
            }
            else {
                vm.custEntities.Other_Customer__c = false;
                vm.disableOtherCheck = false;
            }
        };

        vm.addCustomer = function () {

            validateCustomerName(vm.custEntities);

            if ($scope.addCustomerForm.$invalid)
                return false;
            custLevelServ.setAddCustDetails(vm.custEntities).then(function (response) {
                $uibModalInstance.close(response);
            });

        };

        vm.dismissModal = function () {
            $uibModalInstance.dismiss();
        };

        vm.resetForm = function () {
            vm.custEntities = angular.copy(customerEntities);
            vm.customerName = '0';
            $scope.addCustomerForm.$setPristine(true);
            $scope.addCustomerForm.$error = {};
        };

        vm.mapCustomerId = function () {
            if (validateCustomerName())
                return false;
            var currentCustomer = _.find(vm.customerList, ['customer', vm.customerName]);
            vm.custEntities.SCM_Customer_txt__c = currentCustomer.Id;

        };

        vm.validate = function (value, fieldName) {

            if (isNaN(value * 1))
                $scope.addCustomerForm.$setValidity(fieldName, false);
            else
                $scope.addCustomerForm.$setValidity(fieldName, true);

        };

        vm.calPercentTotal = function (totalKey, totalfieldName, forecastValue) {
            forecastValue = parseInt(forecastValue);
            var totalValue = parseInt(custTransTotal[totalKey]) + forecastValue;
            vm.custEntities[totalfieldName] = Math.round(((forecastValue / totalValue) * 100) * 100) / 100;

        };



        // End of private related functions //

    };

    angular
        .module('scm.customer')
        .controller('addCustCtrl', setAddCustomerController);

    setAddCustomerController.$inject = ['$scope', 'custLevelServ', '$uibModalInstance', 'customerList', 'customerEntities', 'custTransTotal', 'customerDetails'];

})();