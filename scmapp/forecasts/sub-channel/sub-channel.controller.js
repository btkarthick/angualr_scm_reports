/**
 * @name : SubchCtrl
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


    var setSubChannelController = function(formatserv, $uibModal) {

        var vm = this;

        vm.formatForecastList = [];

        vm.generateArray = function() {

            var tempArray = [];

            for (var i = 0; i < 5; i++) {

                tempArray.push(i);
            }

            return tempArray;

        };
        vm.setUpdateChanl = function(objSubChannel, index) {

            var objFormat = objSubChannel.format[index];
            var objModalData = { channelName: "", formatName: "", chID: "", hasFormat: true };

            if (objSubChannel.hasFormat) {

                objModalData.channelName = objSubChannel.channelName;
                objModalData.formatName = objFormat.formatName;
                objModalData.chID = objFormat.id;
            }

            else {
                objModalData.channelName = objSubChannel.channelName;
                objModalData.chID = objSubChannel.format[0].id
                objModalData.hasFormat = false
            }

            formatserv.modalvalues = objModalData;

            console.log( formatserv.modalvalues );
            
            /* For Server - Should be uncommented when moving to the server */

            formatserv.getSubChannelById(objModalData.chID)
                      .then(getSubChannelSuccess, getSubChannelFailure);
            
             /* End of server code */
             
             /** For Local - Shall be uncommented when working in the local */
               
            // var objExtract = formatserv.setEditModalData();
            // var modalOptions = formatserv.setEditModalOptions(objExtract);
            // var editModal = $uibModal.open(modalOptions);
             

             /** End of Local */
        };

        //Private functions starts //

        var modalEditSuccess = function(data) {

            vm.formatForecastList = data;
            console.log(data);
            console.log('Modal values updated successfully!!!')
        };


        var getSubChannelSuccess = function(response) {

            var modalOptions = formatserv.setEditModalOptions(response);

            var editModal = $uibModal.open(modalOptions);

            editModal.result.then(modalEditSuccess, modalEditDismiss);

        };

        var setFormatDataOnLoad = function() {

            formatserv.getSubChannelDetails()
                .then(formatDataSuccess, formatDataFailure)

        };

        var formatDataSuccess = function(response) {

            vm.formatForecastList = response;

            console.log(response);

        }


        var modalEditDismiss = function() {

            console.log('Sub channel edit Modal dismissed at: ' + new Date());
        };


        var formatDataFailure = function() {

        }

        var getSubChannelFailure = function() {

        };


        setFormatDataOnLoad();

    }

    angular
        .module('scm.forecasts')
        .controller('SubchCtrl', setSubChannelController);

    setSubChannelController.$inject = ['formatserv', '$uibModal'];
})();