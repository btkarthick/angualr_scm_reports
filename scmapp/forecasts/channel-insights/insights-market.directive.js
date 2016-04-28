/*
 * Directive - related to Assortment Lazy Loading
 *
 * The coding and best practices are heavily influenced from
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function () {


    'use strict';

    var setMarketInsight = function (InsightsChartService, MarDataService, HelperService) {

        var setMarketController = function () {

            var vm = this;

            vm.objInsights = [];
            vm.legends = [];
            vm.lentoWatch = vm.objInsights.length;
            vm.fairShare = '';
            vm.unitName = '';
            vm.helperService = HelperService;


            vm.setInsightsDataOnLoad = function () {


            };

            // Private functions starts

            var insightsDataSuccess = function (response) {

                vm.objInsights = response.chartData;
                vm.lentoWatch = vm.objInsights.length;
                
            };



        };

        var linkFunc = function (scope, element, attrs, $ctrl) {
            
            var sizeElement;

            var growthElement;

            var setMarketChart = function (data) {
                
                setGrowthChart(data);
                setSizeChart(data);
                
            };
            
            
            var setGrowthChart = function(data){
                 
                var channelGrowthData = MarDataService.getGrowthTable(data);
                
                var channelGrowthOptions = MarDataService.channelGrowthOptions;

                growthElement = document.getElementById('channel_growth');

                channelGrowthOptions.height = (660 / 11) * (channelGrowthData.length - 1);

                InsightsChartService.setBarChart(growthElement, channelGrowthData, channelGrowthOptions);

                
            };
            
            var setSizeChart = function(data){
                
                var channelSizeData = MarDataService.getSizeTable(data);
                
                var channelSizeOptions = MarDataService.channelSizeOptions;
                
                var channelSizeMaxVal = MarDataService.getSizeMaxVal(data.chartData);
                
                channelSizeOptions.hAxis.viewWindow.max = channelSizeMaxVal;
                
                sizeElement = document.getElementById('channel_size');
                
                channelSizeOptions.height = (660 / 11) * (channelSizeData.length - 1);
                
                InsightsChartService.setBarChart(sizeElement, channelSizeData, channelSizeOptions);
                
            };

            var bindDownloadEvent = function () {

                document.getElementById("save_chart_market").addEventListener('click', function () {

                    var elementsForSave = getElementsForSave();
                    
                    $ctrl.helperService.chartSvgToCanvas(sizeElement, elementsForSave.sizeCanvasContainer);
                    $ctrl.helperService.chartSvgToCanvas(growthElement, elementsForSave.growthCanvasContainer);

                    $ctrl.helperService.saveChartAsImage([sizeElement,growthElement], [elementsForSave.sizeCanvasContainer,elementsForSave.growthCanvasContainer], elementsForSave.wrapperToCap, elementsForSave.imageName);


                });

            };

            var getElementsForSave = function () {
                return {
                    
                    growthCanvasContainer: document.getElementById("chart_canvas_growth"),
                    sizeCanvasContainer: document.getElementById("chart_canvas_size"),
                    wrapperToCap: document.getElementById("capture_wrapper"),
                    imageName: 'Market Position'
                    
                };
            };

            var marketDataSuccess = function (response) {

                InsightsChartService.allchartsdata = response;
                var legends = new Array();

                _.forEach(response.chartData, function (format, i) {
                    if (!format.hideCategory) {
                        legends.push(format.format);
                    }
                });
                
                $ctrl.fairShare = response.fairShare + '%';
                $ctrl.unitName = response.unitName;
                $ctrl.legends = legends;
                setMarketChart(response);
            }

            InsightsChartService.getDataForChannelInsights()

                .then(marketDataSuccess);
            bindDownloadEvent();
        };

        var directive = {
            restrict: 'EA',
            link: linkFunc,
            scope: {},
            templateUrl: 'market-position.html',
            controller: setMarketController,
            bindToController: true,
            controllerAs: 'mar'
        }

        return directive;
    }

    angular
        .module('scm.forecasts')
        .directive('insightsMarket', setMarketInsight)

    setMarketInsight.$inject = ['InsightsChartService', 'MarDataService', 'HelperService'];
})();
