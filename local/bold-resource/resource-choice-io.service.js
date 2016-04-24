/**
 * @name : resourceInputserv
 * @description : set Resource Q & A input
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

(function () {

    'use strict';

    var setResourceInputServ = function ( $http, FirebaseUrl, $firebaseArray, ngForceConfig) {

        var JSONURL = ngForceConfig.resourceUrl + '/JSON';

        //var localResFire = $firebaseArray(new Firebase(FirebaseUrl));

        var setQuesEntities = function () {

            return $http.get(JSONURL + '/resource-answers.json')
                .then(function (response) {

                    //var res = _.first(response.data);

                    return (response.data);
                });
        };

        var setUpdateAnswers = function (updatedQnList) {

            var quesList = localResFire.child("Questions");

            quesList.update(updatedQnList, function (error) {
                if (error) {
                    alert("Data could not be saved." + error);
                } else {
                    alert("Data saved successfully.");
                }
            });

            return updatedQnList;

        };

        this.getQuesEntities = setQuesEntities;

        this.updateAnswers = setUpdateAnswers;
    };

    angular
        .module('scm.bold.resource')
        .service('resourceInputserv', setResourceInputServ);

    setResourceInputServ.$nject = [ '$http', 'FirebaseUrl', '$firebaseArray', 'ngForceConfig'];

})();