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

    var setChartService = function( $http, ngForceConfig ) {

         var objChartsData = [];

         var JSONURL = ngForceConfig.resourceUrl + '/JSON';
        
        var setColumnChart = function(element, chartData, options) {
            
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
                
                var chart = new google.visualization.ColumnChart(element);
                
                chart.draw(data, options);
            }
        };
        
        var setBarChart = function(element, chartData, options) {
            
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
                
                var chart = new google.visualization.BarChart(element);
                
                chart.draw(data, options);
            }
        };
       
         var getDataForChannelInsights = function() {

            return $http.get( JSONURL + '/chart-data.json').then(function (response) {
                  
                var res = _.first(response.data);
                return (res.result);
                   
            });
      
        };
        
        var setDownloadModalOptions = function() {

            return {
                animation: true,
                templateUrl: '',
                size: 'lg',
                keyboard: false,
                resolve: {

                    format: function() { return true; }
                }
            }

        };

        
        // Primitive
        
        this.allchartsdata = objChartsData;
        
        // Functions
        
        this.setColumnChart = setColumnChart;
        
        this.setBarChart = setBarChart;
        
        this.setDownloadModalOptions = setDownloadModalOptions;
        
        this.getDataForChannelInsights = getDataForChannelInsights;
        
    }

    angular
        .module('scm.forecasts')
        .service('InsightsChartService', setChartService);


    setChartService.$inject = [ '$http', 'ngForceConfig' ];
})();