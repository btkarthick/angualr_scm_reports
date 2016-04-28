/**
 * 
 * This file is to mock the Sales force setup
 * 
 */

(function(angular){

    var sitePrefix ='./';
   
    angular.module('ngForce.config', []).constant('ngForceConfig', {
        sessionId: 'AFDFDFD!3213232323DFDFWEQWRF',
        sitePrefix: sitePrefix,
        resourceUrl: '.',
        unitCountry : 'UK',
        unitSegment : 'PET'
    });

})(angular);