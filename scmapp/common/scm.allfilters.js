/**
 * This is a one single file for all filters
 * Its uses its own module named scm.filters
 * Which, will be injected into the main module.
 */

/**
 * Wrap everything into an IFFE
 * 
 */

(function () {

    'use strict';

    var setTrustInput = function ($sce) {

        return function (catname) {

            return $sce.trustAsHtml(catname);
        }


    };

    var setReplaceNewLine = function ($sce) {

        return function (textVal) {

            if (angular.isDefined(textVal)) {

                textVal = textVal.replace(/\r?\n/g, '<br/>');

                return $sce.trustAsHtml(textVal);
            }
        };

    };

    /**
     * A filter to format number in Western Notation
     * (eg) 12134567.9876 will be 12,134,567.9876
     */

    var setFormatNumber = function () {

        return function (value) {

            if (angular.isDefined(value)) {
                var parts = value.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            }

        };

    };


    /**
     * A filter to replace all the zero value to 
     * empty strig.
     */

    var replaceZeroWithEmptyString = function () {

        return function (value) {

            return (value === 0) ? "" : value;

        };

    };

    /**
     * A filter for capitalizing words
     */

    var setCapitalizeIt = function () {

        return function (words) {

            return _.capitalize(words);
        }

    };

    /**
     * A filter for capitalizing words
     **/

    var setSortContribution = function () {

        return function (rawContriData) {

            var contriData = [];

            _.forEach(rawContriData, function (contr) {

                var contrName = _.lowerCase(contr.Name);
                if (contrName === 'contribution')
                    contriData[0] = contr;
                else if (contrName === 'gmac')
                    contriData[1] = contr;
                else if (contrName === 'nsv')
                    contriData[2] = contr;

            });
            return contriData;
        }
    };





    angular
        .module('scm.filters', [])
        .filter('trustHtmlInText', setTrustInput)
        .filter('formatNumber', setFormatNumber)
        .filter('replaceZero', replaceZeroWithEmptyString)
        .filter('capitalizeIt', setCapitalizeIt)
        .filter('sortContribution', setSortContribution)
        .filter('replaceNewLine', setReplaceNewLine);



    setTrustInput.$inject = ['$sce'];
    setReplaceNewLine.$inject = ['$sce'];
})();