

/*
 * Directive - for customers/sub-channels on Profit vs. Growth plot
 *
 * The coding and best practices are heavily influenced from
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function () {


    'use strict';




    var setCustInsightsController = function ($scope, CustProfitChartService, $rootScope, custLevelServ, HelperService) {

        var vm = this;

        vm.custLevelServ = custLevelServ;
        vm.helperService = HelperService;
        vm.chartOptions = CustProfitChartService.chartOptions;
        vm.customerChartService = CustProfitChartService;
        vm.chartPercent = parseInt(vm.baseLine);
        vm.contributionName = $rootScope.contributionName;

        $scope.$watch(function (scope) { return vm.baseLine },
            function (newBaseLine) {
                vm.chartPercent = parseInt(newBaseLine);
                vm.chartDraw();
            }
        );

        vm.showDataAlert = false;

    };
    var setCustProfitInsight = function () {

        var linkFunc = function (scope, element, attrs, $ctrl) {

            var cusProfitTable = [];

            var cusProfitOptions = $ctrl.chartOptions;

            cusProfitOptions.hAxis.title = 'Size and Profit (' + $ctrl.contributionName + ')';

            $ctrl.chartContainer = document.getElementById('customer_profit');

            $ctrl.chartDraw = function () {

                $ctrl.customerChartService.getBubbleChart(
                    $ctrl.chartContainer,
                    cusProfitTable,
                    cusProfitOptions,
                    $ctrl.chartPercent
                );


            };

            var getDataSuccess = function (response) {
                if (angular.isDefined(response.chartData)) {

                    $ctrl.chartAxisData = response.lstUnitAxis[0];

                    var AvgCAGRexp = (1 / 5);
                    var AVgCAGRvalue = Math.pow(parseFloat(response.Avg_Mars_RSV_Growth), AvgCAGRexp) - 1;

                    AVgCAGRvalue = AVgCAGRvalue * 100;

                    cusProfitTable = $ctrl.customerChartService.getChartDataTable(response.chartData);
                    var sizeAxis = $ctrl.customerChartService.getSizeAxis(response.chartData);

                    cusProfitOptions.sizeAxis.minSize = sizeAxis;

                    $ctrl.customerChartService.chartOptions.vAxis.baseline = AVgCAGRvalue;
                    $ctrl.chartDraw();

                }
                else
                    $ctrl.showDataAlert = true;


            };

            var bindDownloadEvent = function () {
                
                document.getElementById("save_chart").addEventListener('click', function () {
                    
                    var elementsForSave = getElementsForSave();
                    
                    $ctrl.helperService.chartSvgToCanvas(elementsForSave.chartContainer, elementsForSave.canvasContainer);
                    
                    $ctrl.helperService.saveChartAsImage(elementsForSave.chartContainer, elementsForSave.canvasContainer, elementsForSave.wrapperToCap, elementsForSave.imageName, elementsForSave.downloadEl);
                    

                });

            };

            var getElementsForSave = function () {
                return {
                    chartContainer : $ctrl.chartContainer,
                    canvasContainer : document.getElementById("chart_canvas"),
                    wrapperToCap : document.getElementById("capture_wrapper"),
                    imageName: 'growth-chart',
                    downloadEl: document.getElementById("download_anchor"),
                };
            };

            var getDataRejected = function (response) {

            };


            var response = $ctrl.customerChartService.getDataForCustomerProfit()
                .then(getDataSuccess, getDataRejected);

            bindDownloadEvent();


        };

        var directive = {
            restrict: 'EA',
            scope: {
                baseLine: '=',
                showDataAlert: '=',
                chartAxisData: '='
            },
            link: linkFunc,
            templateUrl: 'cust-profit-chart.html',
            controller: 'custInsightsCtrl',
            controllerAs: 'custInsight',
            bindToController: true
        }

        return directive;
    }

    angular
        .module('scm.customer')
        .directive('insightProfit', setCustProfitInsight)
        .controller('custInsightsCtrl', setCustInsightsController);


    setCustInsightsController.$inject = ['$scope', 'CustProfitChartService', '$rootScope', 'custLevelServ', 'HelperService'];
})();
