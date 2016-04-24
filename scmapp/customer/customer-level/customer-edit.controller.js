
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


    var setEditCustomerController = function ($scope, custLevelServ, HelperService, $uibModalInstance, editCustomerData, custTransTotal, stratergicData) {

        var vm = this;

        var strategicModel;

        var defaultStrategy = HelperService.getDefaultStrategy();

        var mapDefaultStrategy = function () {

            if (angular.isUndefined(vm.custEntities.SCM_Customer_Strategic_Adjust__r))
                strategicModel = defaultStrategy;
            else
                strategicModel = vm.custEntities.SCM_Customer_Strategic_Adjust__r;

            return strategicModel;
        };

        vm.custEntities = angular.copy(editCustomerData);

        vm.strategicModel = mapDefaultStrategy();

        vm.stratergicData = angular.copy(stratergicData);

        vm.stratergicData.push(defaultStrategy);

        vm.mapStrategicData = function () {
            vm.custEntities.SCM_Customer_Strategic_Adjust_Txt__c = vm.strategicModel.Id;
        };

        vm.resetStrategicModel = function (isOther) {
            if (isOther)
                vm.strategicModel = defaultStrategy;
            vm.custEntities.SCM_Customer_Strategic_Adjust_Txt__c = vm.strategicModel.Id;
        };

        vm.editCustomer = function () {

            if ($scope.editCustomerForm.$invalid)
                return false;
            custLevelServ.setEditCustDetails(vm.custEntities).then(function (response) {
                $uibModalInstance.close(response);
            });
        };

        vm.validate = function (value, fieldName) {

            if (isNaN(value * 1))
                $scope.editCustomerForm.$setValidity(fieldName, false);
            else
                $scope.editCustomerForm.$setValidity(fieldName, true);

        };

        vm.calPercentTotal = function (totalKey, totalfieldName, forecastValue, oldForecastKey) {
            forecastValue = parseInt(forecastValue);
            var totalValue = parseInt(custTransTotal[totalKey] - parseInt(editCustomerData[oldForecastKey])) + forecastValue;
            vm.custEntities[totalfieldName] = Math.round(((forecastValue / totalValue) * 100) * 100) / 100;

        };

        vm.resetForm = function () {
            vm.strategicModel = strategicModel;
            vm.custEntities.SCM_Customer_Strategic_Adjust_Txt__c = vm.strategicModel.Id;
            vm.custEntities = angular.copy(editCustomerData);
            $scope.editCustomerForm.$setPristine(true);
            $scope.editCustomerForm.$error = {};
        };

        vm.dismissModal = function () {
            $uibModalInstance.dismiss();
        };



    };

    angular
        .module('scm.customer')
        .controller('editCustCtrl', setEditCustomerController);

    setEditCustomerController.$inject = ['$scope', 'custLevelServ', 'HelperService', '$uibModalInstance', 'editCustomerData', 'custTransTotal', 'stratergicData'];

})();