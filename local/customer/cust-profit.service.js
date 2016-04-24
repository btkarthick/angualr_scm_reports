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

(function() {

    'use strict';

    var setCustProfitChartService = function($http) {
        
        var custDomains = ['Customers', 'Profit', 'Growth', 'Color', 'Size'];
        var custDataTable = [];
        
        var getDataRow = function (rawCustData) {
            
            _.forEach(rawCustData, function(cust,i){
                var row = [];
                row.push(
                    cust.Customer, 
                    cust.Mars_Contribution_2015, 
                    cust.Mars_Category_Sales_By_Customer_CAGR,
                    1,
                    cust.Mars_Category_Sales_By_Customer_2015);
                
                custDataTable.push(row);
            });
        };
       
        var setChartDataTable = function(rawCustData){
            
           custDataTable = [];
           custDataTable.push(custDomains); 
           getDataRow(rawCustData);
           return custDataTable;
           
        };
        
         var getDataForCustomerProfit = function() {

            return $http.get('JSON/cust-profit-data.json');
      
        };

        var chartDataTable = [
            ['Customers', 'Profit', 'Growth', 'Color', 'Size'],
            ['Walmart'         , 75, 2.3, 1, 1000],
            ['Walgreens'         , 79.84, 2.36, 1, 10],
            ['Albertsons/Safeway', 78.6, 3.84, 1, 20],
            ['Kroger'            , 72.73, 4.78, 1, 30],
            ['Meijer'           , 80.05, 2.5, 1, 40],
            ['Family Dollar', 72.49, 2.7, 1, 50],
            ['Dollar'       , 68.09, 4.77, 1, 60],
            ['Kmart', 81.55, 2.96, 1, 70],
            ['Target', 73.6, 1.54, 1, 500],
            ['CVS', 68.6, 2.43, 1, 90],
            ['BJs', 68.6, 3.54, 1, 100],
            ['Publix', 78.09, 3.05, 1, 110],
            ['SuperValue', 79.09, 2.05, 1, 120],
            ['Delhaize', 78.09, 4.05, 1, 130]
        ];

        var objChartOptions = {
            width: 900,
            height: 600,
            chartArea: { top: '12%' ,left:'11%', width: '85%', height: '70%' },
            hAxis: {
                baseline: 75,
                baselineColor : '#000',
                gridlines : {color: '#000', count: 2},
                title : 'Size and Profit',
                titleTextStyle:{
                    color : 'red',
                    bold: true,
                    italic: false
                }
            },
            vAxis: {
                baseline: 2.5,
                baselineColor : '#000',
                gridlines : {color: '#000', count: 2},
                title: 'Growth',
                titleTextStyle:{
                    color : 'red',
                    bold: true,
                    italic: false
                }
            },
            bubble: { textStyle: { fontSize: 11, auraColor: 'none' }, stroke : '#ffffff' },
            colorAxis : {
                minValue: 0,  
                colors: [ '#ffffff', '#cccccc' ],
                legend: { position : 'none' }
            },
            sizeAxis : {minSize: 10,  maxSize: 100},
            allowHtml:true
        };

        var setBubbleChart = function(element, chartData, options) {

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

                chart.draw(data, options);
            }
        };

        // Primitive

        this.chartDataTable = chartDataTable;

        this.chartOptions = objChartOptions;

        // Functions

        this.getBubbleChart = setBubbleChart;
        
        this.getChartDataTable = setChartDataTable;
        
        this.getDataForCustomerProfit = getDataForCustomerProfit;

    }

    angular
        .module('scm.customer')
        .service('CustProfitChartService', setCustProfitChartService);


    setCustProfitChartService.$inject = ['$http'];
})();