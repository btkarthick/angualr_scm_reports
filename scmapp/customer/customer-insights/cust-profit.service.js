/**
 * @name : InsightsChartService
 * @desc : Service for extending the Google Chart's API
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

    var setCustProfitChartService = function (vfr, PRIORITYCONTROLLER, ngForceConfig) {


        var custDomains = ['Customers', 'Profit', 'Growth', 'Color', 'Size'];
        var custDataTable = [];
        var maxHAxisValue, minHAxisValue;
        var getDataRow = function (rawCustData) {

            _.forEach(rawCustData, function (cust, i) {

                var row = [];
                var CAGRexp = (1 / 5);
                var CAGRvalue = Math.pow(parseFloat(cust.Mars_Category_Sales_By_Customer_CAGR), CAGRexp) - 1;
                
                console.log("CAGRvalue " + CAGRvalue);
                
                CAGRvalue = CAGRvalue * 100;
                
                row.push(
                    _.unescape(cust.Customer),
                    cust.Mars_Contribution,
                    CAGRvalue,
                    1,
                    cust.Mars_Category_Sales_By_Customer);

                custDataTable.push(row);
            });
        };

        var setChartDataTable = function (rawCustData) {

            custDataTable = [];
            custDataTable.push(custDomains);
            getDataRow(rawCustData);
            return custDataTable;

        };

        var setSizeAxis = function (chartData) {
            console.log(chartData);
            var getValBy = 'Mars_Category_Sales_By_Customer';
            var minVal = (_.minBy(chartData, getValBy))[getValBy];
            var maxVal = (_.maxBy(chartData, getValBy))[getValBy];
            
            var minValPercent = (minVal/maxVal)*100;
            
            return minValPercent;
            
            
        };

        var getDataForCustomerProfit = function () {

            var getCustProftFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'BubbleChartData', {}, false);

            return getCustProftFunc( ngForceConfig.selectedGroupID ).then(function (response) {

                return (response);

            });

        };
        var updateChartAxis = function (chartAxis) {

            var UpdChartAxisFunc = vfr.send(PRIORITYCONTROLLER + '.' + 'BubbleChartAxisSave', {}, false);

            return UpdChartAxisFunc(chartAxis).then(function (response) {

                return (response);

            });

        };

        var objChartOptions = {
            width: 900,
            height: 600,
            chartArea: { top: '12%', left: '11%', width: '85%', height: '70%' },
            hAxis: {
                baselineColor: '#000',
                gridlines: { color: '#000', count: 2 },
                title: 'Size and Profit',
                titleTextStyle: {
                    color: '#000',
                    bold: true,
                    italic: false
                },
                minValue: 0,
                maxValue: 100, 
                //textPosition: 'none'

            },
            vAxis: {
                baseline: 2.5,
                baselineColor: '#ff0000',
                gridlines: { color: '#000', count: 2 },
                title: 'Growth',
                titleTextStyle: {
                    color: '#000',
                    bold: true,
                    italic: false
                },
                //textPosition: 'none',
                minValue: -2,
                maxValue: 2

            },
            bubble: { textStyle: { fontSize: 11, auraColor: 'none' }, stroke: '#ffffff' },
            colorAxis: {
                minValue: 0,
                colors: ['#ffffff', '#cccccc'],
                legend: { position: 'none' }
            },
            sizeAxis: { minSize: 40, maxSize: 100 },
            allowHtml: true
        };

        var setBubbleChart = function (element, chartData, options, chartPercent) {

            // Load the Visualization API and the corechart package.          
            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.

            function drawChart() {

                // Create the data table.
                var data = google.visualization.arrayToDataTable(chartData);
                // Instantiate and draw our chart, passing in some options.

                var chart = new google.visualization.BubbleChart(element);

                var runChart = true;

                var readyEvent = google.visualization.events.addListener(chart, 'ready', calcBaseLine);
                options.hAxis.baseline = chartPercent;
                chart.draw(data, options);

                function calcBaseLine() {

                    maxHAxisValue = Math.round(chart.getChartLayoutInterface().getHAxisValue(863));
                    minHAxisValue = Math.round(chart.getChartLayoutInterface().getHAxisValue(99));
                    var axisLen = maxHAxisValue - minHAxisValue;
                    var fixHBaseLine = Math.round((axisLen * chartPercent) / 100);
                    options.hAxis.baseline = fixHBaseLine;
                    google.visualization.events.removeListener(readyEvent);
                    chart.draw(data, options);
                    runChart = false;

                }



            }
        };

        // Primitive

        this.chartOptions = objChartOptions;

        this.maxHAxisValue = maxHAxisValue;

        this.minHAxisValue = minHAxisValue;

        // Functions

        this.getBubbleChart = setBubbleChart;

        this.getChartDataTable = setChartDataTable;

        this.getDataForCustomerProfit = getDataForCustomerProfit;
        
        this.getSizeAxis = setSizeAxis;
        
        this.updateChartAxis = updateChartAxis;



    }

    angular
        .module('scm.customer')
        .service('CustProfitChartService', setCustProfitChartService);


    setCustProfitChartService.$inject = ['vfr', 'PRIORITYCONTROLLER', 'ngForceConfig'];
})();