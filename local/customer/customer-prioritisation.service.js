/**
 * @name : cprserv
 * @description : Local Service for Customer prioritisation related
 * functionality
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setCustomerPriorityController = function ($http, ngForceConfig) {

        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        var getPriorityDetails = function () {

            return $http.get(JSONURL + '/priority_customer.json')
                .then(function (response) {

                    // var res = _.first(response.data);
                    // return (res.result);
                    
                    return (response.data);
                });

        };
        
        
        var generateNewPriorityValues = function (pData) {

            var objArr = [];

            _.forEach(pData, function (obj) {

                var objPriority = {};

                objPriority.id = obj.Id;
                objPriority.customer_id = obj.SCM_Customer__r.Id;
                objPriority.customer_name = obj.SCM_Customer__r.Name;
                objPriority.xAxis = obj.SCM_Customer_Adjusted_Xaxis__c;
                objPriority.yAxis = obj.SCM_Customer_Adjusted_Yaxis__c;

                if (angular.isDefined(obj.SCM_Customer_Strategic_Adjust__r)) {

                    objPriority.priority_source = setAdjustedStrategy(obj.SCM_Customer_Strategic_Adjust__r.Name);
                }

                else { objPriority.priority_source = 'unassigned'; }
                
                
                objPriority.priority_dest = (angular.isDefined(obj.SCM_Customer_Adjusted_Priority__c)) ? obj.SCM_Customer_Adjusted_Priority__c : "";
                
                objPriority.showText = (objPriority.priority_dest!="") ? true : false;
                
                objPriority.isMissMatch =  ( objPriority.priority_source !== objPriority.priority_dest ) ? true : false;
                
                objPriority.showInQuadrant = setShowInQuadrantOnLoad( objPriority.xAxis, 
                                                                      objPriority.yAxis, 
                                                                      objPriority.priority_source, 
                                                                      objPriority.priority_dest );

                objArr.push(objPriority);

            });

            return objArr;
        };
        
        var setShowInQuadrantOnLoad = function(xPos, yPos, priority_source, priority_dest){
            
            var flag = true;
            
            if( angular.isUndefined(xPos) ||  angular.isUndefined(yPos)){
                
                flag = false;
            }
            
            else if( xPos === '9999' && yPos === '9999'){
                
                flag = false;
            }
            
            else if( priority_source === 'unassigned' || priority_dest === 'unassigned' || priority_dest === "")
            {
                flag = false;
            }
            return flag;
            
        };

        var setAdjustedStrategy = function (strategy) {

            var newStrategy = "";
            
            strategy = strategy.split(' ').join('_').toLowerCase();
            
            console.log(strategy);
            
            switch( strategy ){
                
                case "emerging_stars":
                       newStrategy = "emerging_stars";
                     break;
                    
                 case "partners":
                       newStrategy = "partners"; 
                     break;
                    
                    
                  case "niche_players":
                     newStrategy = "niche_players";
                    break;
                    
                  case "scale":
                     newStrategy = "scale";
                    break;
                    
                   default:
                       newStrategy = "unassigned";
                   break;        
                
            };

            return newStrategy;

        };


        this.getPriorityDetails = getPriorityDetails;

        this.getCustomPriorityValues = generateNewPriorityValues;

    };

    angular
        .module('scm.customer')
        .service('cprserv', setCustomerPriorityController);


    setCustomerPriorityController.$inject = ['$http', 'ngForceConfig'];

})();