/**
 * @name : SCM Common service
 * @desc : Common service platform for the SCM project 
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

    var setHelperService = function () {

        var setCustomerEntities = function () {
            return {
                "Unit_Country_Txt__c": "",
                "Unit_Segment_TXT__c": "",
                "SCM_Customer__c": "",
                "SCM_Customer_Strategic__c": "",
                "SCM_Customer_Contribution__c": "",
                "FMCG_Forecast__c": "",
                "FMCG_Actual__c": "",
                "Overall_Actual__c": "",
                "Overall_Forecast__c": "",
                "Overall_Total__c": "",
                "Mars_Actual__c": "",
                "Mars_Forecast__c": "",
                "SCM_Customer_Contribution_Txt__c": "",
                "SCM_Customer_Strategic_Adjust_Txt__c": "",
                "Mars_Total__c": "",
                "Contribution_Actual__c": "",
                "Contribution_Forecast__c": "",
                "Contribution_Total__c": "",
                "Trade__c": "",
                "SCM_Customer_txt__c": "",
                "Other__c": "",
                "Other_Customer__c": false,
            };
        };
        var setDefaultStrategy = function () {
            return {
                "Id": "",
                "Name": "None"
            };
        };

        var setChoiceAnswerModel = function () {
            return {
                "SCM_Questioner_Txt__c": "",
                "Answer__c": "",
            };
        };

        var toggleCanvasView = function (chartContainer, canvasContainer, showCanvas) {

            if (showCanvas) {

                canvasContainer.setAttribute("style", "display: block");
                chartContainer.setAttribute("style", "display: none");

            }
            else {

                canvasContainer.setAttribute("style", "display: none");
                chartContainer.setAttribute("style", "display: block");

            }

        };

        var setToggleCharts = function (chartContainer, canvasContainer, showCanvas) {

            if (angular.isArray(chartContainer)) {
                _.forEach(chartContainer, function (container, offset) {
                    toggleCanvasView(container, canvasContainer[offset], showCanvas);
                });
            }
            else
                toggleCanvasView(chartContainer, canvasContainer, showCanvas);
        };

        var setSaveChartAsImage = function (chartContainer, canvasContainer, wrapperToCap, imageName) {

            setToggleCharts(chartContainer, canvasContainer, true);

            html2canvas(wrapperToCap,
                {
                    onrendered: function (canvas) {
                        setToggleCharts(chartContainer, canvasContainer, false);
                        canvas.toBlob(function (blob) {
                            saveAs(blob, imageName + '.png');
                        }, "image/png");

                    }

                }
            );

        };

        var setSaveHtmlAsImage = function (wrapperToCap, imageName) {

            html2canvas(wrapperToCap,
                {
                    onrendered: function (canvas) {

                        canvas.toBlob(function (blob) {
                            saveAs(blob, imageName + '.png');
                        }, "image/png");


                    }

                }
            );

        };

        var chartSvgToCanvas = function (chartContainer, canvasContainer) {

            var chartElement = _.first(chartContainer.getElementsByTagName('svg'));
            var canvasEl = _.first(canvasContainer.getElementsByTagName('canvas'));
            var svgSnippet = _.first(chartElement.parentNode.innerHTML.split('<div'));

            canvg(canvasEl, svgSnippet);

        };
        
        
        var setDecimalRounding = function( value, decimals ){
            
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        };
        
        
        // Primitive
        this.getCustomerEntities = setCustomerEntities;
        this.getDefaultStrategy = setDefaultStrategy;

        // Functions
        this.getChoiceAnswerModel = setChoiceAnswerModel;
        this.saveChartAsImage = setSaveChartAsImage;
        this.chartSvgToCanvas = chartSvgToCanvas;
        this.saveHtmlAsImage = setSaveHtmlAsImage;
        this.decimalRoundTo = setDecimalRounding;


    }

    angular
        .module('scm.services', [])
        .service('HelperService', setHelperService);


    setHelperService.$inject = [];
})();