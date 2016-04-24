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

                var channelSizeData = MarDataService.getSizeTable(data);

                var channelGrowthData = MarDataService.getGrowthTable(data);

                var channelSizeOptions = MarDataService.channelSizeOptions;

                var channelGrowthOptions = MarDataService.channelGrowthOptions;

                sizeElement = document.getElementById('channel_size');

                growthElement = document.getElementById('channel_growth');

                channelSizeOptions.height = (660 / 11) * (channelSizeData.length - 1);

                channelGrowthOptions.height = (660 / 11) * (channelGrowthData.length - 1);

                InsightsChartService.setBarChart(sizeElement, channelSizeData, channelSizeOptions);

                InsightsChartService.setBarChart(growthElement, channelGrowthData, channelGrowthOptions);


            };

            var bindDownloadEvent = function () {

                document.getElementById("save_chart_market").addEventListener('click', function () {

                    var elementsForSave = getElementsForSave();
                    
                    $ctrl.helperService.chartSvgToCanvas(sizeElement, elementsForSave.sizeCanvasContainer);
                    $ctrl.helperService.chartSvgToCanvas(growthElement, elementsForSave.growthCanvasContainer);

                    $ctrl.helperService.saveChartAsImage([sizeElement,growthElement], [elementsForSave.sizeCanvasContainer,elementsForSave.growthCanvasContainer], elementsForSave.wrapperToCap, elementsForSave.imageName, elementsForSave.downloadEl);


                });

            };

            var getElementsForSave = function () {
                return {
                    
                    growthCanvasContainer: document.getElementById("chart_canvas_growth"),
                    sizeCanvasContainer: document.getElementById("chart_canvas_size"),
                    wrapperToCap: document.getElementById("capture_wrapper"),
                    imageName: 'market-position',
                    downloadEl: document.getElementById("download_anchor")
                    
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

                
                /** Commentted by Karthick B - As this is no longer needed 
                _.forEach(legends, function (legend, i) {
                    legend = legend.toLowerCase();
                    legend = legend.split(' ');
                    _.forEach(legend, function (val, j) {

                        var firstLetter = val.charAt(0).toUpperCase();
                        val = firstLetter + val.substring(1, val.length);
                        legend[j] = val;

                    });
                    legend = legend.toString().replace(/,/g, ' ');
                    legends[i] = legend; 

                }); *******/
                
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
