

/*
 * Directive - for downloading resource palnning table as image
 *
 * The coding and best practices are heavily influenced from
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function () {


    'use strict';

    var setPrintBoldOutput = function (HelperService) {

        var linkFunc = function (scope, element, attrs, $ctrl) {



            var bindDownloadEvent = function () {

                document.getElementById("save_chart").addEventListener('click', function () {

                    var elementsForSave = getElementsForSave();

                    HelperService.saveHtmlAsImage(elementsForSave.wrapperToCap, elementsForSave.imageName);

                });

            };

            var getElementsForSave = function () {
                return {
                    
                    wrapperToCap: document.getElementById("capture_wrapper"),
                    imageName: 'Bold Resource Choices'
                  
                };
            };

            bindDownloadEvent();


        };

        var directive = {
            restrict: 'EA',
            scope: {
            },
            link: linkFunc
        }

        return directive;
    }

    angular
        .module('scm.bold.resource')
        .directive('printBoldOutput', setPrintBoldOutput);

    setPrintBoldOutput.$inject = ['HelperService'];
})();
