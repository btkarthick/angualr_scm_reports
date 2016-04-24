/**
 * @name : MarDataService
 * @desc : Service for formatting the Json Data to Google Charts data rows.
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

    var setMarketDataService = function() {

        var channelSizeTable = new Array();
        
        var sizeDomainHeader =  [
            'Domain'
            , 'Mars Share of Channel', { role: 'style' }, { role: 'annotation' }
            , 'Remaining Channel'

        ];

        var getSharePercentage = function(sharePercent, fairShare) {

            var barColor = '#339966';

            if (fairShare > sharePercent) {

                barColor = '#ff5050';

            }

            return barColor;

        };

        var getSizeDataRow = function(rawMarketData) {

            var fairShare = rawMarketData.fairShare;
            rawMarketData = _.reverse(rawMarketData.chartData);

            var chartSpacing = 2,isFirst = true;

            _.forEach(rawMarketData, function(value, i) {
                
                if (!value.hideCategory) {
                    
                    var row = new Array();
                    var barColor = getSharePercentage( value.sharePercent, fairShare);

                    if (!isFirst) {

                        chartSpacing = chartSpacing + 4;

                    }
                    isFirst = false;

                    row.push(chartSpacing, value.marsCategory, barColor, value.sharePercent + '%', value.remainingShare);
                    channelSizeTable.push(row);
                }

            });

        };

        var getSizeTable = function(rawMarketData) {
            channelSizeTable = new Array();
            channelSizeTable.push(sizeDomainHeader);
            getSharePercentage(rawMarketData);
            getSizeDataRow(rawMarketData);
            return channelSizeTable;
        };

        var channelGrowthTable = new Array();
        
        var growthDomainHeader = [
            'Element'
            , 'Mars Share of Channel', { role: 'annotation' }
        ];


        var getGrowthDataRow = function(rawGrowthData) {

            rawGrowthData = rawGrowthData.chartData;

           var chartSpacing = 2,isFirst = true;

            _.forEach(rawGrowthData, function(value, i) {
                if (!value.hideCategory) {

                    var row = new Array();
                     if (!isFirst) {

                        chartSpacing = chartSpacing + 4;

                    }
                    isFirst = false;
                    row.push(chartSpacing, value.channelGrowth, value.channelGrowth + '%');

                    channelGrowthTable.push(row);
                }

            });
        };

        var getGrowthTable = function(rawGrowthData) {
            channelGrowthTable = new Array();
            channelGrowthTable.push(growthDomainHeader);
            getGrowthDataRow(rawGrowthData);
            return channelGrowthTable;
        };


        var channelSizeOptions = {
            width: 500,
            height: 650,
            legend: 'none',
            bar: { groupWidth: '50%' },
            isStacked: true,
            chartArea: { top: '3%', left: '26%', width: '66%', height: '80%' },
            hAxis: {
                    title: 'Channel size (RSV, $M)',
                titleTextStyle: {
                    bold: true,
                    italic: false,
                    fontSize: 12
                },  
                 gridlines: { count: 4, color: '#fff' },
                 baseline: 1,
                baselineColor: '#000',
                
            },
            tooltip: {
                trigger: 'none'
            },
            colors: ['#339966', '#CCCBCA'],
            vAxis: {
                gridlines: { count: 3, color: '#fff' }, 
                baseline: 0,
                baselineColor: '#000',
                textPosition: 'none'
            }

        };

        var channelGrowthOptions = {
            width: 360,
            height: 650,
            legend: 'none',
            tooltip: {
                trigger: 'none'
            },
            bar: { groupWidth: '55%' },
            chartArea: { top: '3%', width: '95%', height: '80%' },
            barWidth: 4,
            interval: {
                'i0': { 'color': 'blue', 'style': 'bars', 'barWidth': 1.3, 'lineWidth': 0.5, 'fillOpacity': 1 }
            },

            hAxis: {
                gridlines: { count: 3, color: '#fff' },
                ticks: [0, 30],
                title: 'Channel growth (%)',
                titleTextStyle: {
                    bold: true,
                    italic: false,
                    fontSize: 12
                }
            },
            colors: ['#CCCBCA'],
            vAxis: {
                baseline: 0,
                gridlines: { count: 3, color: '#fff' },
                baselineColor: '#000',
                textPosition: 'none',

            },

            annotations: {
                textStyle: {
                    bold: true,
                    color: '#000',

                }
            }

        };


        this.channelSizeOptions = channelSizeOptions;

        this.channelGrowthOptions = channelGrowthOptions;

        this.getSizeTable = getSizeTable;

        this.getGrowthTable = getGrowthTable;

    }

    angular
        .module('scm.forecasts')
        .service('MarDataService', setMarketDataService);


    setMarketDataService.$inject = [];
})();