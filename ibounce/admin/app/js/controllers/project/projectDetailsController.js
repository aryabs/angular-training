(function() {

    projectDetailsController = function($rootScope, $scope, $location, $window, $http, $q, $route, listProjectsService, moduleService, apiService, ngDialog, cssService, Commonservice) {
        $scope.projectId = (window.location.hash).split('/').reverse()[0];
        $scope.projectName = $rootScope.projectName;

        var fetchingProjectModuleDetails = listProjectsService.getProjectModuleDetails($scope.projectId);
        fetchingProjectModuleDetails.then(function(resp) {

            if (resp.moduleDteails) {
                $scope.moduleDetails = resp.moduleDteails;
                $scope.moduleDetails.unshift({'moduleid': '0', 'modulename': 'Common'});
            }
            else {
                $scope.moduleDetails = [];
                $scope.moduleDetails.push({'moduleid': '0', 'modulename': 'Common'});
            }


            $scope.initialClick = function(moduleDetail) {
                $scope.clickedModule = moduleDetail;
            }

            $scope.openModule = function(moduleDetail) {
                if ($('.module' + moduleDetail.moduleid).parent().hasClass('mpActive')) {

                }
                else {
                    $scope.moduleId = moduleDetail.moduleid;
                    $scope.clickedModule = moduleDetail;
                    $scope.selected = '';
                    var gettingModuleApiDetails = moduleService.getModuleApiDetails($scope.projectId, $scope.moduleId);
                    gettingModuleApiDetails.then(function(resp) {
                        $scope.showApiDetails(resp);
                    });

                }
            }


            if ($rootScope.setModule) {
                $scope.initialClick({modulename: "", moduleid: $rootScope.setModule});
                $scope.openModule({modulename: "", moduleid: $rootScope.setModule});
            }
            else {
                $scope.initialClick({modulename: "Common", moduleid: "0"});
                $scope.openModule({modulename: "Common", moduleid: "0"});
            }





            $scope.editModuleName = function(moduleDetail) {
                $scope.selected = moduleDetail;
                $scope.clickedModule = moduleDetail;
            }

            $scope.isSelected = function(moduleDetail) {

                return $scope.selected === moduleDetail;
            }

            $scope.selectedModule = function(moduleDetail) {
                return $scope.clickedModule.moduleid === moduleDetail.moduleid;
            }

            $scope.hideDeleteIcon = function(moduleDetail) {
                return moduleDetail.moduleid === '0';
            }

            $scope.readOnly = function(moduleDetail) {
                if ($scope.selected === moduleDetail) {
                    return false;
                }
                else {
                    return true;
                }
            }


            var responseArray = [];
            $scope.showApiDetails = function(resp) {
                $scope.loadApiDetails = true;
                for (var index = 0; index < resp.length; index++) {
                    resp[index].responses.forEach(function(option) {
                        if (option.res_isenabled == '1') {
                            resp[index].selectedRequest = option;
                        }
                    });
                }
                $scope.apis = resp;
               
                if (resp.length > 0) {
                    resp[0].responses.forEach(function(res) {
                        responseArray.push({'respID': res.res_id, statusCode: res.res_statuscode});
                    });
                }
            }


            $scope.selectBoxValueChanged = function(api) {
                $rootScope.setModule = $scope.moduleId;
               
                var responseId;
                responseArray.forEach(function(response) {
                    if (response.statusCode === api.res_statuscode) {
                        responseId = response.respID;
                    }
                })

                var saveChangedValue = apiService.changeResponseSelectBox(api.res_req_id, responseId);
                saveChangedValue.then(function(resp) {
                    if (resp) {
                        $route.reload();
                    }
                })
            }

            $scope.updateModule = function(module) {
                var obj = {};
                obj.modulename = module.modulename;
                obj.projectid = $scope.projectId;
                obj.moduleid = module.moduleid;
                var updatingModuleDetails = moduleService.updateModule(obj);
                updatingModuleDetails.then(function(resp) {
                    if (resp) {
                        $route.reload();
                    }
                });
            }

            $scope.callDeleteModuleService = function(moduleDetail) {
                var deletingModule = moduleService.deleteModule(moduleDetail.moduleid);
                deletingModule.then(function(resp) {
                    if (resp) {
                        $route.reload();
                    }
                });
            }


            $scope.submitConfirmBox = function() {
                if ($scope.confirmBoxType === 'apiDelete') {
                    var deleteingApi = apiService.deleteApi($scope.apiToBeDeleted.req_id);
                    deleteingApi.then(function(resp) {
                        if (resp) {
                            $scope.apis.forEach(function(allapi, index) {
                                if (allapi.req_id === $scope.apiToBeDeleted.req_id) {
                                    $scope.apis.splice(index, 1);
                                }
                            })
                        }
                    });
                }
                else if ($scope.confirmBoxType === 'moduleDelete') {
                    var gettingAvailableApiInModule = moduleService.getAvailableApiInModule($scope.moduleDetailToBeDeleted.moduleid);
                    gettingAvailableApiInModule.then(function(apiCount) {
                        if (apiCount > 0) {
                            $scope.closeConfirmBox();
                            $scope.confirmBoxMessage = "Module cointains " + apiCount + " API. Do u Want to still Delete?";
                            $scope.confirmBoxType = 'checkForApiCountDelete';
                            ngDialog.open({template: 'views/projectView/confimBoxPopup.html', scope: $scope, closeByDocument: false});
                        }
                        else {
                            $scope.callDeleteModuleService($scope.moduleDetailToBeDeleted);
                        }
                    });
                }

                else if ($scope.confirmBoxType === 'checkForApiCountDelete') {
                    $scope.callDeleteModuleService($scope.moduleDetailToBeDeleted);
                }
                $scope.closeConfirmBox();
            }


            $scope.deleteApi = function(api) {
                $scope.confirmBoxMessage = "Do you want to Delete " + api.req_name + " API?"
                $scope.confirmBoxType = 'apiDelete';
                $scope.apiToBeDeleted = api;
                ngDialog.open({template: 'views/projectView/confimBoxPopup.html', scope: $scope, closeByDocument: false});

            }

            $scope.deleteModule = function(moduleDetail) {
                $scope.confirmBoxMessage = "Do you want to Delete " + moduleDetail.modulename + " Module?";
                $scope.confirmBoxType = 'moduleDelete';
                $scope.moduleDetailToBeDeleted = moduleDetail;
                ngDialog.open({template: 'views/projectView/confimBoxPopup.html', scope: $scope, closeByDocument: false});
            }

            $scope.cancelModule = function() {
                $route.reload();
            }

            $scope.createNewModule = function() {
                $rootScope.showModuleNameAvailability = false;
                ngDialog.open({template: 'views/projectView/createNewModulePopup.html', scope: $scope, closeByDocument: false});
            }

            $scope.checkForAvilabilityOfModuleName = function(moduleName) {
                var type = 'module';
                Commonservice.checkForAvailability(moduleName, $scope.moduleDetails, type);
            }

            $scope.closeNewProjectCreationPopup = function() {

                ngDialog.close();
            }

            $scope.closeConfirmBox = function() {
                ngDialog.close();
            }



            $scope.submitCreateNewModule = function(moduleName) {
                var obj = {};
                obj.modulename = moduleName;
                obj.projectid = $scope.projectId;
                var submittingNewModuleDetails = moduleService.createNewModule(obj);
                submittingNewModuleDetails.then(function(resp) {
                    if (resp) {
                        $route.reload();
                        ngDialog.close();
                    }
                });

            }

            $scope.editApiDetails = function(api) {
                $rootScope.setModule = $scope.moduleId;
                $window.location.hash = '/editApi/' + 'projectId:' + $scope.projectId + '/moduleId:' + $scope.moduleId + '/apiId:' + api.req_id;
            }

            $scope.createNewApi = function() {
                $rootScope.setModule = $scope.moduleId;
                $window.location.hash = '/createApi/' + 'projectId:' + $scope.projectId + '/moduleId:' + $scope.moduleId + '/newApi';
            }

            $scope.backButton = function() {
                $rootScope.setModule = '';
                $window.location.hash = '/listProjects/';
            }


        });
    }

    window.Controllers = window.Controllers || {};
    window.Controllers.projectDetailsController = projectDetailsController;

})();