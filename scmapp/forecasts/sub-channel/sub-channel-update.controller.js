/**
 * @name : EditChannelCtrl
 * @desc : A controller for edit Channel functionality
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

    var setEditChannelController = function($scope, formatserv, $uibModalInstance, format) {

        var vm = this;

        vm.format = angular.copy(format);
        
        vm.modalData = formatserv.modalvalues;

        if (angular.isUndefined(vm.format.Mars_Channel_Total_Spent__c)) {

            vm.format.Mars_Channel_Total_Spent__c = "";
        }

        if (angular.isUndefined(vm.format.Mars_Trade_Spend__c)) {

            vm.format.Mars_Trade_Spend__c = "";
        }

        if (angular.isUndefined(vm.format.Mars_Customer_Promotion_Spend__c)) {

            vm.format.Mars_Customer_Promotion_Spend__c = "";
        }

        if (angular.isUndefined(vm.format.Mars_DandE__c)) {

            vm.format.Mars_DandE__c = "";
        }

        if (angular.isUndefined(vm.format.Mars_Overhead__c)) {

            vm.format.Mars_Overhead__c = "";
        }


        vm.updateSubChannelDetails = function() {

            if ($scope.editShareForm.$invalid)
            { return false; }

             replaceEmptyWithZero();       


            formatserv.setInsertFormatDetails(vm.format)
                .then(insertSuccess, insertFailure);
        }

        vm.resetForm = function() {
            resetError();
            vm.format = format;
        }

        vm.validate = function(value, fieldName) {

            validateTotal();
            if (isNaN(value * 1))
                $scope.editShareForm[fieldName].$setValidity(fieldName, false);
            else
                $scope.editShareForm[fieldName].$setValidity(fieldName, true);

        };

        vm.dismissModal = function() {

            $uibModalInstance.dismiss();

        };

        // Private functions starts
        var insertSuccess = function(response) {

            $uibModalInstance.close(response);

        };

        var insertFailure = function() {


        };

        var validateTotal = function() {

            var total = parseInt(vm.format.Mars_Channel_Total_Spent__c);
            var tradeSpend = parseInt(vm.format.Mars_Trade_Spend__c);
            var consumerSpend = parseInt(vm.format.Mars_Customer_Promotion_Spend__c);
            var deSpend = parseInt(vm.format.Mars_DandE__c);
            var overHead = parseInt(vm.format.Mars_Overhead__c);

            total = isNaN(total) ? 0 : total;
            tradeSpend = isNaN(tradeSpend) ? 0 : tradeSpend;
            consumerSpend = isNaN(consumerSpend) ? 0 : consumerSpend;
            deSpend = isNaN(deSpend) ? 0 : deSpend;
            overHead = isNaN(overHead) ? 0 : overHead;
            var calcTotal = tradeSpend + consumerSpend + deSpend + overHead;

            if (total >= calcTotal)
                $scope.editShareForm.$setValidity('total', true);
            else
                $scope.editShareForm.$setValidity('total', false);
        };



        var resetError = function() {

            $scope.editShareForm['Total_Spend'].$setValidity('Total_Spend', true);
            $scope.editShareForm['Trade_Spend'].$setValidity('Trade_Spend', true);
            $scope.editShareForm['Promotion_Spend'].$setValidity('Promotion_Spend', true);
            $scope.editShareForm['DE_Spend'].$setValidity('DE_Spend', true);
            $scope.editShareForm['OverHead_Spend'].$setValidity('OverHead_Spend', true);
            $scope.editShareForm.$setPristine(true);
            $scope.editShareForm.$error = {};

        };

        var replaceEmptyWithZero = function() {
            
            
            if (vm.format.Mars_Channel_Total_Spent__c === "") {

                vm.format.Mars_Channel_Total_Spent__c = 0;
            }

            if (vm.format.Mars_Trade_Spend__c === "") {

                vm.format.Mars_Trade_Spend__c = 0;
            }

            if (vm.format.Mars_Customer_Promotion_Spend__c === "") {

                vm.format.Mars_Customer_Promotion_Spend__c = 0;
            }

            if (vm.format.Mars_DandE__c === "") {

                vm.format.Mars_DandE__c = 0;
            }

            if (vm.format.Mars_Overhead__c === "") {

                vm.format.Mars_Overhead__c = 0;
            }

        };

        // End of private functions

    };

    angular
        .module('scm.forecasts')
        .controller('EditChannelCtrl', setEditChannelController);


    setEditChannelController.$inject = ['$scope', 'formatserv', '$uibModalInstance', 'format'];

})();