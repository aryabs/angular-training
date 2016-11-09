(function() {

    listProjectsController = function($rootScope, $scope, $location, $http, $q, $route, listProjectsService, createProjectsService, cssService, loginService, ngDialog, Commonservice) {
        var getProjectDetails = listProjectsService.callGetProjectDetails();
        getProjectDetails.then(function(resp) {

            $scope.projectDetails = resp;
            $scope.deleteProject = function(projectDetail) {
                $scope.confirmBoxMessage = "Do you want to Delete " + projectDetail.proname + " Project?";
                ngDialog.open({template: 'views/projectView/confimBoxPopup.html', scope: $scope, closeByDocument: false});
                $scope.submitConfirmBox = function() {
                    $scope.closeConfirmBox();
                    var deletingProject = listProjectsService.deleteProject(projectDetail.proid);
                    deletingProject.then(function(resp) {
                        if (resp) {
                          
                            //alert('Project Deleted');
                            $route.reload();
                        }
                    });
                }
            }
            $scope.editProject = function(projectDetail) {
                $scope.selected = projectDetail;
            }

            $scope.isSelected = function(projectDetail) {
                return $scope.selected === projectDetail;
            }

            $scope.readOnly = function(projectDetail) {
                if ($scope.selected === projectDetail) {
                    return false;
                }
                else {
                    return true;
                }
            }

            $scope.cancelProjectDetails = function() {
                $route.reload();
            }

            $scope.saveProjectDetails = function(projectDetail) {
                var obj = {};
                obj.projectname = projectDetail.proname;
                obj.serverurl = projectDetail.proserverurl;
                obj.projecturl = projectDetail.prourl;
                obj.projId = projectDetail.proid;
                var saveProjectDetails = listProjectsService.saveProjectDetails(obj);
                saveProjectDetails.then(function(resp) {
                    if (resp) {
                        $route.reload();
                    }
                });
            }
            $scope.showProjectDetails = function(projectDetail) {
                $rootScope.projectServerUrl = projectDetail.proserverurl;
                $rootScope.projectName = projectDetail.proname;
                localStorage.projectServerUrl = projectDetail.proserverurl;
                localStorage.projectUrl = projectDetail.prourl;
                window.location.hash = '/projectDetails/' + projectDetail.proid;
            }

            $scope.createNewProject = function() {
                $rootScope.showProjectAvailability = false;
                $rootScope.projectName = '';
                $rootScope.projectUrl = '';
                $rootScope.projectServerUrl = '';
                ngDialog.open({template: 'views/projectView/createNewProjectPopup.html', scope: $scope, closeByDocument: false});
            }

            $scope.checkForAvilabilityOfProjectName = function(projName) {
                var type = 'project';
                Commonservice.checkForAvailability(projName, $scope.projectDetails, type);
            }

            $scope.submitCreateNewProjectdetails = function(projectName, projectUrl, projectServerUrl) {
                var obj = {};
                obj.projectname = projectName;
                obj.serverurl = projectServerUrl;
                obj.projecturl = projectUrl;
                var createNewProject = createProjectsService.createNewProject(obj);
                createNewProject.then(function(resp) {
                    if (resp) {
                        ngDialog.close();
                        $route.reload();
                    }
                });
            }

            $scope.closeNewProjectCreationPopup = function() {
                ngDialog.close();
            }

            $scope.closeConfirmBox = function() {
                ngDialog.close();
            }

            $scope.logout = function() {
                loginService.callLogOutApi();
            }

        });

    }

    window.Controllers = window.Controllers || {};
    window.Controllers.listProjectsController = listProjectsController;

})();