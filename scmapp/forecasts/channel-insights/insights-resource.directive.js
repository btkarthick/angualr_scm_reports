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


    var setResouceInsight = function (InsightsChartService, ResDataService, resDataTable, HelperService) {

        var linkFunc = function (scope, element, attrs) {

            var resourceSuccess = function () {

                var data = InsightsChartService.allchartsdata.chartData;

                var resData = ResDataService.getResData(data);
                resDataTable = resData.resTable;
                ResDataService.resourcesSpendoptions.colors = resData.resBgColor;


                InsightsChartService.setColumnChart(
                    document.getElementById('resource_spend'),
                    resDataTable,
                    ResDataService.resourcesSpendoptions
                );
                
                var bindDownloadEvent = function () {

                    document.getElementById("save_chart_resource").addEventListener('click', function () {
                
                        var elementsForSave = getElementsForSave();
                        
                        HelperService.chartSvgToCanvas(elementsForSave.chartContainer, elementsForSave.canvasContainer);

                        HelperService.saveChartAsImage(elementsForSave.chartContainer, elementsForSave.canvasContainer, elementsForSave.wrapperToCap, elementsForSave.imageName, elementsForSave.downloadEl);


                    });

                };

                var getElementsForSave = function () {
                    return {
                        chartContainer: document.getElementById('resource_spend'),
                        canvasContainer: document.getElementById("chart_canvas"),
                        wrapperToCap: document.getElementById("capture_wrapper"),
                        imageName: 'resource-chart',
                        downloadEl: document.getElementById("download_anchor"),
                    };
                };

                bindDownloadEvent();
            };

            InsightsChartService.getDataForChannelInsights()

                .then(resourceSuccess);


        };

        var directive = {
            restrict: 'EA',
            scope: {},
            link: linkFunc,
            templateUrl: 'resources-spend.html',
        }

        return directive;
    }

    angular
        .module('scm.forecasts')
        .directive('insightsResource', setResouceInsight)

    setResouceInsight.$inject = ['InsightsChartService', 'ResDataService', 'resDataTable', 'HelperService'];
})();
