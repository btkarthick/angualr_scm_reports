/**
 * @name : resourceInputserv
 * @description : set Resource Q & A input
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function() {

    'use strict';

    var setResourceInputServ = function(vfr,RESOURCESCONTROLLER, ngForceConfig) {
        
        var setQuesEntities =  function(){
             var getQuesFunc = vfr.send(RESOURCESCONTROLLER + '.' + 'showQuestionerAnswer', {}, false);

            return getQuesFunc( ngForceConfig.selectedGroupID ).then(function(response) {

                return (response);

            });
        };
        
        var setUpdateAnswers =  function(updatedAnswers){
            
             var updAnsFunc = vfr.send(RESOURCESCONTROLLER + '.' + 'questionerAnswerInsertORUpdate', {}, false);

            return updAnsFunc( ngForceConfig.selectedGroupID, updatedAnswers).then(function(response) {

                return (response);

            });
        };

        this.getQuesEntities = setQuesEntities;

        this.updateAnswers = setUpdateAnswers;
    };

    angular
        .module('scm.bold.resource')
        .service('resourceInputserv', setResourceInputServ);

    setResourceInputServ.$inject = ['vfr','RESOURCESCONTROLLER', 'ngForceConfig'];
})();