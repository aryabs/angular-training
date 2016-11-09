'use strict';
(function(angular) {
    angular.module('myApp.controllers', ['ngDialog'])
            .controller('loginController', Controllers.loginController)
            .controller('listProjectsController', Controllers.listProjectsController)
            .controller('createNewProjectController', Controllers.createNewProjectController)
            .controller('projectDetailsController', Controllers.projectDetailsController)
            .controller('editApiController', Controllers.editApiController)
            .controller('createApiController', Controllers.createApiController)
           

})(angular);













