/**
 * @name : CatchCtrl
 * @desc: Controller for Category channel listing and other functionalities
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

    var setCustomerLevelController = function ($uibModal, custLevelServ, HelperService, $rootScope) {

        var vm = this;

        var custData = [];

        vm.customerDetails = [];

        vm.currentContribution = {};

        vm.updateCustContribution = function (contributionId) {
            custLevelServ.updateCustomerContribution(contributionId).then(
                function (response) {
                    vm.contributionId = contributionId;
                    $rootScope.contributionName = vm.currentContribution.Name;
                }
            );
        };

        custLevelServ.getCustomerDetails().then(

            function (response) {

                vm.customerDetails = response;

            }

        );

        custLevelServ.getCustomerList().then(

            function (response) {
                custData = response;
                vm.contributionData = custData.contributionData;
                vm.contributionId = custData.currentContributionID;
                vm.currentContribution = custData.lstSelectedCustCont[0];
                $rootScope.contributionName = vm.currentContribution.Name;
            }
        );


        var setEditModalInstance = function (editCustomerData, custTranTotal) {

            var customerEntities = HelperService.getCustomerEntities();

            customerEntities.SCM_Customer_Contribution_Txt__c = vm.currentContribution.Id;

            var editModalOptions = custLevelServ.getEditCustModalOptions(editCustomerData, custTranTotal, custData.stratergicData);

            var editModalInstance = $uibModal.open(editModalOptions);

            editModalInstance.result.then(
                function (response) {
                    vm.customerDetails = response;
                }
            );

        };


        var setAddModalInstance = function (custData, customerEntities, custTransTotal) {
            
            customerEntities.SCM_Customer_Contribution_Txt__c = vm.currentContribution.Id;

            var addModalOptions = custLevelServ.getAddCustModalOptions(vm.customerDetails, custData, customerEntities, custTransTotal);

            var addModalInstance = $uibModal.open(addModalOptions);

            addModalInstance.result.then(
                function (response) {
                    vm.customerDetails = response;
                }
            );

        };


        vm.editCustModal = function (custTransId) {

            var custTranTotal;

            var editCustDataSuccess = function (response) {

                setEditModalInstance(response, custTranTotal);

            };

            var getTotSuccess = function (response) {

                custTranTotal = response;
                custLevelServ.getEditCustomerData(custTransId).then(editCustDataSuccess, editCustDataError);

            };

            var getTotError = function (response) { };

            var editCustDataError = function (response) { };

            custLevelServ.getCustTransactTotal().then(getTotSuccess, getTotError);



        };



        vm.addCustModal = function () {

            var customerEntities = HelperService.getCustomerEntities();

            customerEntities.SCM_Customer_Contribution_Txt__c = vm.contributionId;

            var getTotalSuccess = function (response) {

                var custTransTotal = response;

                setAddModalInstance(custData, customerEntities, custTransTotal);

            };

            var getTotalError = function (response) {

            };

            custLevelServ.getCustTransactTotal().then(getTotalSuccess, getTotalError);

        };

        //Private functions start

    }



    angular
        .module('scm.customer')
        .controller('custLevelCtrl', setCustomerLevelController);

    setCustomerLevelController.$inject = ['$uibModal', 'custLevelServ','HelperService', '$rootScope'];

})();