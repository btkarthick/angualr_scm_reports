/**
 * @name : ResCtrl
 * @desc: Controller for customers resource planning
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setResourcesController = function (resourceserv) {

        var vm = this;

        vm.resourcesList = {};

        vm.emergingDummyRows = [];
        vm.partnerDummyRows = [];
        vm.nicheDummyRows = [];
        vm.scaleDummyRows = [];


        // Private related functions starts //

        var getResourcesOnLoad = function () {

            resourceserv.getCustomerResData()
                .then(customerDataSuccess, customerDataFailure);

        };

        var customerDataSuccess = function (response) {

            vm.resourcesList = response;

            setEmergingPartnersDummyRows();

            setNicheScaleDummyRows();

        };

        var customerDataFailure = function () {


        };

        var setEmergingPartnersDummyRows = function () {

            var emergingLength = isDefined(vm.resourcesList.emergingStars.actuals);
            var partnersLength = isDefined(vm.resourcesList.partners.actuals);
            var emergingPartners = resourceserv.getEmptyRowsCount(emergingLength, partnersLength);
            vm.emergingDummyRows = _.range(emergingPartners.leftRows);
            vm.partnerDummyRows = _.range(emergingPartners.rightRows);

        };

        var setNicheScaleDummyRows = function () {

            var nicheLength = isDefined(vm.resourcesList.nichePlayers.actuals);
            var scaleLength = isDefined(vm.resourcesList.scale.actuals);
            var nicheScale = resourceserv.getEmptyRowsCount(nicheLength, scaleLength);
            
            vm.nicheDummyRows = _.range(nicheScale.leftRows);
            vm.scaleDummyRows = _.range(nicheScale.rightRows);

        };
        
        var isDefined = function(val){
            
            return (angular.isDefined(val) ? val.length : 0);
            
        };


        getResourcesOnLoad();
    };

    angular
        .module('scm.bold.resource')
        .controller('ResCtrl', setResourcesController);

    setResourcesController.$inject = ['resourceserv'];
})();