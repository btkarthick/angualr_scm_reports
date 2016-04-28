/**
 * @name : ResIoCtrl
 * @desc: Controller for bold resource choices Input & Output
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setResourceIOController = function ($scope,$timeout, resInpserv, HelperService) {

        var vm = this;

        var questions = {};

        var qnPriorities = [];

        vm.qn = {};
        
        vm.maxlenShort = 140;
        
        vm.maxlenLong = 240;
        
        vm.showAlert = false;
        
        var callAtTimeout = function(){
              vm.showAlert = false;
        };

        vm.submitFaqForm = function () {

            if ($scope.faqForm.$invalid)
                return false;

            var extractedAnswers = setExtractAnswers();
            resInpserv.updateAnswers(extractedAnswers).then(

                function (response) {

                    questions = response;
                    questions = setAnswerModel(questions);
                    vm.qn = angular.copy(questions);
                    vm.showAlert = true;
                    $timeout(callAtTimeout, 2000);
                }

            );
        };

        vm.resetForm = function () {
            
            vm.qn = angular.copy(questions);
            $scope.faqForm.$setPristine();
            $scope.faqForm.$error = {};
            
        };


        var getQuesOnLoad = function () {

            resInpserv.getQuesEntities().then(
                function (response) {
                    questions = response;
                    console.log(response);
                    questions = setAnswerModel(questions);
                    vm.qn = angular.copy(questions);
                }
            );

        };

        var setExtractAnswers = function () {

            var extractedAnswers = [];

            _.forEach(qnPriorities, function (priority) {

               extractedAnswers.push(_.map(vm.qn[priority], 'SCM_Answers__r'));

            });

            return _.flattenDeep(extractedAnswers);

        };

        var getAnswerOnPriority = function (priority, questions) {

            _.forEach(questions[priority], function (question, offset) {


                if (angular.isUndefined(question.SCM_Answers__r)) {
                    console.log(questions[priority][offset]);
                    questions[priority][offset].SCM_Answers__r = [];
                    questions[priority][offset].SCM_Answers__r.push(HelperService.getChoiceAnswerModel());
                    questions[priority][offset].SCM_Answers__r[0].SCM_Questioner_Txt__c = question.Id;

                }

            });

        };

        var setAnswerModel = function (questions) {

            qnPriorities = _.keysIn(questions);
            _.forEach(qnPriorities, function (priority) {

                getAnswerOnPriority(priority, questions);

            });

            return questions;
        };

        getQuesOnLoad();
    };

    angular
        .module('scm.bold.resource')
        .controller('ResIoCtrl', setResourceIOController);

    setResourceIOController.$inject = ['$scope','$timeout', 'resourceInputserv', 'HelperService'];

})();