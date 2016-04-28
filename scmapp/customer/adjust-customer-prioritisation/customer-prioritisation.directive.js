/**
 * Customer prioritization directive
 * @name adjustPriority
 */

/**
 * Wrap everything in a IFFE
 */

(function () {

    'use strict';

    var setAdjustedPriorityController = function ($scope, cprserv) {

        var vm = this;

        vm.contribName = "";

        vm.customersGroupBySoruce = [];
        
        vm.customersGroupByDest = [];
        
        vm.clonedChangedPriority = [];

        vm.draggableOptions = { revert : 'invalid' }
        
        vm.onDroppableOver = function( event, ui ){
            
            $(this).addClass('active');
        };
        
        vm.onDroppableOut = function( event, ui  ){
            
            $(this).removeClass('active');
        };

        vm.onDroppableEvent = function (event, ui) {

            /**
             * TODO - Reprase the write it in a more understandable way
             * Get the respective values for the recently dropped element
             * The values includes
             * current quadrant, current index in the object, source priority,
             * current customer object's id. This is not the customer id.
             */

             $(this).removeClass('active');

            var current_quadrant = $(this).attr('data-quadrant');
            var current_index = parseInt(ui.draggable.attr('data-custom-index'));
            var source_priority = ui.draggable.attr('data-custom-soruce');
            var Id = ui.draggable.attr('data-custom-id');
            var custID = ui.draggable.attr('data-custom-custid');
            var is_miss_match = (source_priority === current_quadrant) ? false : true;

            console.log( 'Source ' + source_priority );
            
            console.log( 'Customer Id ' +  custID);
            
            console.log(vm.customersGroupBySoruce[source_priority]);
            
            /**
             *  Changes that should happen in the right side table goes here 
             *  This is based on the above inputs for the recently dropped element
             * 
             */
            
              var cust_index = _.findIndex(vm.customersGroupBySoruce[source_priority], ['customer_id', custID]);
             
             if( cust_index > -1 ){
                 
                $scope.$apply(function () {

                    vm.customersGroupBySoruce[source_priority][cust_index].showText = true;

                    vm.customersGroupBySoruce[source_priority][cust_index].isMissMatch = is_miss_match;

                });
                 
             }
 
            /**
             * Now the fun part - DOM manipulation
             * appending the recently dragged element into the current droppable element 
             */
            
            var drag_document_offset = ui.helper.offset();
            var drop_document_offset = $(this).offset();
            var newLeft = Math.round((drag_document_offset.left) - (drop_document_offset.left));
            var newTop = Math.round((drag_document_offset.top) - (drop_document_offset.top));

            

             ui.draggable.css( { position: 'absolute', left: newLeft, top : newTop  } );
             
             $(this).append(ui.draggable);
             
             /**
             * ------ Preparing for the final save ------- 
             * Update the original response with the current values 
             * 
             */
        
            var array_index = _.findIndex(vm.customerData, ['Id', Id]);
            
            if( array_index > -1 ){

                vm.customerData[array_index].SCM_Customer_Adjusted_Xaxis__c = _.toString(newLeft) + 'px';

                vm.customerData[array_index].SCM_Customer_Adjusted_Yaxis__c = _.toString(newTop) + 'px';

                vm.customerData[array_index].SCM_Customer_Adjusted_Priority__c = current_quadrant;
            }
            
            
        };
        
        // $scope.$watch(function(){
            
        //     return vm.resetFlag;
            
        // }, function(){
              
        //         vm.customersGroupBySoruce = _.groupBy(vm.clonedChangedPriority, 'priority_source');
        //         vm.customersGroupByDest = _.groupBy(vm.clonedChangedPriority, 'priority_dest');
                
        //     });

        
        // *** Private related data starts ***//

        var getPriorityOnLoad = function () {

            cprserv.getPriorityDetails()
                .then(priorityOnLoadSuccess, priorityOnLoadFailure);

        };


        var priorityOnLoadSuccess = function (response) {

            vm.customerData = response;
            
            if( vm.customerData.length > 0 ){
                
            var priorityDataCopy = angular.copy(vm.customerData);
            
            var objFirst = _.first(priorityDataCopy);
            
            vm.contribName = objFirst.SCM_Customer_Contribution__r.Name;
            
            var objChangedPriority = cprserv.getCustomPriorityValues(priorityDataCopy);
            
            vm.clonedChangedPriority = angular.copy( objChangedPriority );
            
            vm.customersGroupBySoruce = _.groupBy(objChangedPriority, 'priority_source');
            
            vm.customersGroupByDest = _.groupBy(objChangedPriority, 'priority_dest');
                         
            }
            
            else{
                vm.failureFlag = true;
            }  

        };

        var priorityOnLoadFailure = function () {

        };
        
        //*** End of private related functionality ***//

        // Call the function on Load //
        getPriorityOnLoad();

    };

    var setAdjustPriority = function ($timeout, HelperService) {

        var linkFunc = function ($scope, element, $attrs, $ctrl) {

            // Make item dragabble //

            $timeout(function () {

                $(".cpr-btn").draggable($ctrl.draggableOptions);

            }, 1000);



            // Make a droppable item here //

            $(".cpr-dd-inner section").droppable({

                accept: '.cpr-btn',
                tolerance: 'fit',
                drop: $ctrl.onDroppableEvent,
                over: $ctrl.onDroppableOver,
                out: $ctrl.onDroppableOut
            });
        
            $('#save_chart').on('click', function(){
                
                HelperService.saveHtmlAsImage( $('#capture_wrapper'), 'Adjust Customer Prioritisation');
                
            });
          
            // Trigger thing when the scope has been destroyed //

            $scope.$on('$destroy', function () {

                $(".cpr-btn").draggable("destroy");
                $(".cpr-dd-inner section").droppable("destroy");
            });
        };

        setAdjustedPriorityController.$inject = ['$scope', 'cprserv'];

        var directive = {

            restrict: 'E',
            controller: 'AdjustPriorityCtrl',
            controllerAs: 'apc',
            link: linkFunc,
            scope: { customerData : '=?', failureFlag : '=', resetFlag : '=' },
            //templateUrl: './templates/customer/adjust-customer-chart.html',
            templateUrl: 'adjust-customer-chart.html',
            bindToController: true

        }

        return directive;
    }


    angular
        .module('scm.customer')
        .controller('AdjustPriorityCtrl', setAdjustedPriorityController)
        .directive('adjustPriority', setAdjustPriority);

    setAdjustPriority.$inject = ['$timeout', 'HelperService']

})();