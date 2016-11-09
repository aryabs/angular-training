(function() {

    createNewProjectController = function($scope, $location, $http, $q, createProjectsService, ngDialog) {

        $scope.submitCreateNewProjectdetails = function(projectName, projectUrl, projectServerUrl) {
            var obj = {};
            obj.projectname = projectName;
            obj.serverurl = projectServerUrl;
            obj.projecturl = projectUrl;
            var createNewProject = createProjectsService.createNewProject(obj);
            createNewProject.then(function(resp) {
                if (resp) {
                    window.location.hash = '/listProjects';
                }
            });
        }
    }

    window.Controllers = window.Controllers || {};
    window.Controllers.createNewProjectController = createNewProjectController;

})();