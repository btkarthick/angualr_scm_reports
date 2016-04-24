/**
 * @name : CatchCtrl
 * @desc: Controller for Category channel listing and other functionalities
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

    var setCatChannelController = function(catserv, $uibModal) {

        var vm = this;

        vm.categoryForecastList = [];

        vm.generateArray = function() {

            var tempArray = [];

            for (var i = 0; i < 13; i++) {

                tempArray.push(i);
            }

            return tempArray;

        };

        vm.setUpdateCat = function(objcat, index) {

            var objFormat = objcat.format[index];

            var objModalData = { channelName: "", formatName: "", chID: "", hasFormat: true };

            if (objcat.hasFormat) {

                objModalData.channelName = objcat.channelName;
                objModalData.formatName = objFormat.formatName;
                objModalData.chID = objFormat.id;
            }

            else {

                objModalData.channelName = objcat.channelName;
                objModalData.chID = objcat.format[0].id
                objModalData.hasFormat = false
            }

            // Set data to service variable.
            // Set total values to the modal data for calculations.

            objModalData['total'] = vm.categoryForecastList.totalsales;

            catserv.modalvalues = objModalData;
            
            /* For Server - Should be uncommented when moving to the server */

            catserv.getChannelById( objModalData.chID )
                .then(function(response) {

                    channelByIdSuccess(response);

                });
                
              /* End of server code */  


            /** For Local - Shall be uncommented when working in the local */

            // var objCatExtract = catserv.getEditModalData();
            // var modalOptions = catserv.getEditModalOptions( objCatExtract );
            // var editModal = $uibModal.open(modalOptions);

            /** End of Local */

        };

        //Private functions starts

        var modalEditSuccess = function(data) {

            vm.categoryForecastList = data;
            
        };

        var channelByIdSuccess = function(response) {

            var modalOptions = catserv.getEditModalOptions(response);

            var editModal = $uibModal.open(modalOptions);

            editModal.result.then(modalEditSuccess, modalEditDismiss);

        };

        var setChannelCatData = function() {

            catserv.getCategoryDetails()

                .then(catDetailsSuccess, catDetailsFailure);
        };


        var catDetailsSuccess = function(response) {

            vm.categoryForecastList = response;

        };

        var catDetailsFailure = function() {


        };


        var modalEditDismiss = function() {

            console.log('Channel Modal dismissed at: ' + new Date());
        };


        setChannelCatData();

    }



    angular
        .module('scm.forecasts')
        .controller('CatchCtrl', setCatChannelController);

    setCatChannelController.$inject = ['catserv', '$uibModal'];

})();