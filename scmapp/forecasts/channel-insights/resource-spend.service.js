/**
 * @name : ResDataService
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

    var setResourceSpendService = function() {

        var resTable = new Array();
        var domain = new Array();
        var resBgColor = new Array();
        var formats = new Array();

        var setDomainData = function(rawResData) {

            domain = ['Resources Spend'];
            _.forEach(rawResData, function(resource) {
                if (resource.categoryToday > 0 || resource.futureCategory > 0 || resource.marsSpend > 0) {
                    domain.push(resource.format, { role: 'style' });
                }
            });
            resTable.push(domain);

            console.log(rawResData);

        };

        var checkDomain = function(format) {
            var hasDomain = false;
            
            _.forEach(domain, function(value) {
                if (value == format)
                    hasDomain = true;
            });

            return hasDomain;
        };

        var setConstantData = function(rawResData) {

            var i, chartSpacing = 4;

            for (i = 0; i < 3; i++) {

                var resConstRow = new Array();
                var currentMap = '';
                if (i > 0) {
                    chartSpacing = chartSpacing + 8;
                }
                switch (i) {
                    case 0:
                        currentMap = 'categoryToday';
                        break;

                    case 1:
                        currentMap = 'marsSpend';
                        break;

                    case 2:
                        currentMap = 'futureCategory';
                        break;
                }

                resConstRow.push(chartSpacing);

                _.forEach(rawResData, function(value, j) {
                    var hasDomain = checkDomain(value.format);

                    if (value[currentMap] > 0) {

                        resConstRow.push(value[currentMap], value.bgColor);



                    }
                    else if (value[currentMap] === 0 && hasDomain) {

                        resConstRow.push(0, '');

                    }
                });
                resTable.push(resConstRow);
            }
            
             _.forEach(resTable, function(row, i) {
                    
                if (i === 0) {
                    
                    _.forEach(row, function(value, j) {
                        
                        if(j > 0){
                            
                            if(angular.isString(value)){
                               var resource = _.find(rawResData,function(r) { return r.format === value });
                               resBgColor.push(resource.bgColor);
                            }
                        }
                            
                    });
                }
            });
            
        };

        var getResData = function(rawResData) {
            resTable = [];
            var rawResData = rawResData;
            setDomainData(rawResData);
            setConstantData(rawResData);
            return {
                resTable: resTable,
                resBgColor: resBgColor
            };
        };



        var resourcesSpendoptions = {
            width: 870,
            height: 500,
            tooltip: {
                trigger: 'none'
            },
            legend: {
                textStyle: {
                    fontSize: 12
                }
            },
            isStacked: 'percent',
            bar: {
                groupWidth: '80%',
            },
            chartArea: {
                top: '15%',
                left: '10%',
                width: '70%',
                height: '80%'
            },
            vAxis: {
                ticks: [0, .25, .50, .75, 1],
                baseline: 0,
                baselineColor: '#000',
                gridlines: {
                    color: '#fff',
                    count: 4
                }
            },
            hAxis: {
                ticks: [4, 8, 12, 16, 20, 24],
                baseline: 0,
                baselineColor: '#000',
                gridlines: {
                    color: '#fff',
                    count: 4
                },
                textPosition: 'none'

            },
            colors: resBgColor,
            annotations: {

                textStyle: {
                    fontName: 'Arial',
                    fontSize: 12,
                    textPosition: 'none'
                },
                stem: {
                    color: 'red',
                    length: 20
                },
            }
        };


        this.resourcesSpendoptions = resourcesSpendoptions;

        this.getResData = getResData;

    }

    angular
        .module('scm.forecasts')
        .service('ResDataService', setResourceSpendService);


    setResourceSpendService.$inject = [];
})();












































































