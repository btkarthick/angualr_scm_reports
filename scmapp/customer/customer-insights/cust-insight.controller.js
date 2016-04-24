/**
 * @name : CustProfitCtrl
 * @desc: Controller for Insight Charts
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


    var setCustProfitController = function ($scope,CustProfitChartService) {
        var vm = this;
        vm.chartAxisData = {};
        vm.showDataAlert = false;


        vm.updateChartAxis = function (chartAxis) {

            vm.chartAxisData.Customer_Insight_Axis_Position__c = chartAxis;

            CustProfitChartService.updateChartAxis(vm.chartAxisData).then(function (chartAxisData) {
                vm.baseLineH = chartAxisData.Customer_Insight_Axis_Position__c;
            });
        };

        vm.cropChart = function () {
            alert("This feature is under development");
        };

        var watchChartData = function () {
            $scope.$watch(function (scope) { return vm.chartAxisData },
                function (newChartData) {
                    if (angular.isDefined(newChartData.Customer_Insight_Axis_Position__c)) {
                        vm.axisLineH = (newChartData.Customer_Insight_Axis_Position__c).toString();
                        vm.baseLineH = vm.axisLineH;
                    }
                }
            );
        };

        watchChartData();
    }

    angular
        .module('scm.customer')
        .controller('CustInsightCtrl', setCustProfitController);

    setCustProfitController.$inject = ['$scope','CustProfitChartService'];

})();