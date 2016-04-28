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

(function() {

    'use strict';


    var setEditCategoryController = function($scope, catserv, $uibModalInstance, format, HelperService) {

        var vm = this;

        vm.format = angular.copy(format);

        vm.modalData = catserv.modalvalues;
        
        
        //vm.format.Category_Update_Remark = "";

        vm.calOverAllCAGR1520 = function() {

            //vm.format.Category_Total_Sales_CAGR_5Y__c
            var actuals = parseFloat(vm.format.Category_Total_Sales_Actuals__c);

            var forecast = parseFloat(vm.format.Category_Total_Sales_Forecast__c);

            /** Formula --> ((forecast/actuals)^(1/5)) -1 **/

            var totalSales = (Math.pow((forecast / actuals), 1 / 5)) - 1;

            totalSales = HelperService.decimalRoundTo((totalSales * 100), 2);

            vm.format.Category_Total_Sales_CAGR_5Y__c = totalSales;
            
            // Calculate Mars share Actuals
            vm.calMarsShareActuals();

        };

        vm.calOverAllTotal = function() {

            //vm.format.Category_Total_Sales_Forecast__c

            var forecast = parseFloat(vm.format.Category_Total_Sales_Forecast__c);

            var forecastTotal = parseFloat(vm.modalData.total.overall[1]);

            /** Formula --> forecast / forecastTotal  */

            var overAllTotal = HelperService.decimalRoundTo(((forecast / forecastTotal) * 100), 2);

            vm.format.Category_Total_Sales_Total__c = overAllTotal;

            //Recalculate Over all CAGR1520 in this bulr too //
            vm.calOverAllCAGR1520();
            
            // Calculate Mars Category Share
            vm.calMarsShareForecasts();

        };

        vm.calMarsCAGR1520 = function() {

            //vm.format.Mars_Category_Total_Sales_Actuals__c
            //vm.format.Mars_Category_Total_Sales_Forecast__c

            var actuals = parseFloat(vm.format.Mars_Category_Total_Sales_Actuals__c);

            var forecast = parseFloat(vm.format.Mars_Category_Total_Sales_Forecast__c);

            /** Formula --> ((forecast/actuals)^(1/5)) -1 **/

            var totalSales = (Math.pow((forecast / actuals), 1 / 5)) - 1;

            totalSales = HelperService.decimalRoundTo((totalSales * 100), 2);

            vm.format.Mars_Category_Total_Sales_CAGR_5Y__c = totalSales;

            // Calculate Mars share Actuals
            vm.calMarsShareActuals();
        };
        

        vm.calMarsOverAllTotal = function() {

            //vm.format.Mars_Category_Total_Sales_Forecast__c

            var forecast = parseFloat(vm.format.Mars_Category_Total_Sales_Forecast__c);

            var forecastTotal = parseFloat(vm.modalData.total.mars[1]);

            /** Formula --> forecast / forecastTotal  */

            var overAllTotal = HelperService.decimalRoundTo(((forecast / forecastTotal) * 100), 2);

            vm.format.Mars_Category_Total_Sales_Total__c = overAllTotal;

            //Recalculate Mars CAGR1520   in this bulr too //
            vm.calMarsCAGR1520();
            
            // Calculate Mars Category Share
            vm.calMarsShareForecasts();


        };


        // Calculate Mars share actuals //
        vm.calMarsShareActuals = function() {

            var overallActuals = parseFloat(vm.format.Category_Total_Sales_Actuals__c);

            var marsActuals = parseFloat(vm.format.Mars_Category_Total_Sales_Actuals__c);

            var total = (marsActuals / overallActuals) * 100;

            total = HelperService.decimalRoundTo(total, 2);
            // Mars share actuals
            vm.format.Mars_Category_Share_Actuals__c = total;
            
            // Calculate PP change
            vm.calMarsSharePPChange();

            return total;

        };

        // Calculate Mars Share Forecasts //

        vm.calMarsShareForecasts = function() {

            var overallForecast = parseFloat(vm.format.Category_Total_Sales_Forecast__c);

            var marsForecast = parseFloat(vm.format.Mars_Category_Total_Sales_Forecast__c);

            var total = (marsForecast / overallForecast) * 100;
            
            total = HelperService.decimalRoundTo(total, 2);

            // Mars share actuals
            vm.format.Mars_Category_Share_Forecast__c = total;
            
            // Calculate PP change
            vm.calMarsSharePPChange();

            return total;
        };
        
        /** Calculate MARS share PP change ***/
        
        vm.calMarsSharePPChange = function(){
            
            var marsShareActuals = parseFloat( vm.format.Mars_Category_Share_Actuals__c );
            
            var marsShareForecast = parseFloat(vm.format.Mars_Category_Share_Forecast__c);
            
            var ppchange = HelperService.decimalRoundTo((marsShareActuals -  marsShareForecast), 2);
            
            vm.format.Mars_Category_Share_PP_Change__c = ppchange;
        
        };
        
        /** End of Mars share PP change ***/


        vm.updateChannel = function() {

            /*** Edit category validation goes here ***/
            if ($scope.editCategoryForm.$invalid)
                return false;

            catserv.setInsertCatDetails(vm.format)
                .then(categoryInsertSuccess, categoryInsertFailure);


        }

        vm.resetForm = function() {
            resetError();
            vm.format = angular.copy(format);
        }

        vm.dismissModal = function() {

            $uibModalInstance.dismiss();
        };

        vm.validate = function(value, fieldName) {

            if (isNaN(value * 1))
                $scope.editCategoryForm.$setValidity(fieldName, false);
            else
                $scope.editCategoryForm.$setValidity(fieldName, true);

        };


        // Private related function starts //

        var categoryInsertSuccess = function(response) {

            $uibModalInstance.close(response);
        };

        var categoryInsertFailure = function() {

        };

        var resetError = function() {
            $scope.editCategoryForm.$setPristine(true);
            $scope.editCategoryForm.$error = {};
        };

        // End of private related functions //

    };

    angular
        .module('scm.forecasts')
        .controller('EditCatCtrl', setEditCategoryController);

    setEditCategoryController.$inject = ['$scope', 'catserv', '$uibModalInstance', 'format', 'HelperService'];

})();