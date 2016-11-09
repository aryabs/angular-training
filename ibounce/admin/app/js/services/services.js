'use strict';

/* Services */

angular.module('myApp.services', [])

        .service('loginService', function($http, cssService) {
            this.callLoginApi = function(credentials, $scope) {
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/auth/login",
                    data: credentials,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                    if (resp.status == 1) {
                        window.location.hash = '/listProjects';
                    }
                    else {
                        $scope.invalidLogin = true;
                        $scope.alertMessage = 'Invalid UserName or Password';
                        $scope.userName = '';
                        $scope.password = '';
                    }
                });
            }
            this.callLogOutApi = function() {
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/auth/logout",
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                    if (resp.status == 1) {
                        window.location.hash = '/';
                    }
                });
            }
        })

        .service('listProjectsService', function($http, $q, loginService) {
            this.callGetProjectDetails = function() {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/project/api'})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(resp.projectDetails);
                            }
                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }
            this.saveProjectDetails = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'PUT',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/project/api",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                })
                        .success(function(resp) {

                            if (resp.status == 1) {
                                defer.resolve(true);
                            }
                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }
            this.getProjectModuleDetails = function(projectId) {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/module/api/' + projectId})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(resp);
                            }

                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }
            this.deleteProject = function(projectId) {
                var defer = $q.defer();
                $http({
                    method: 'DELETE',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/project/api/" + projectId,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                    if (resp.status == 1) {
                        defer.resolve(true);
                    }
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;
            }
        })

        .service('createProjectsService', function($http, $q, loginService) {
            this.createNewProject = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/project/api",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {

                    if (resp.status == 1) {
                        defer.resolve(true);
                    }
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;
            }

        })

        .service('moduleService', function($http, $q, loginService) {

            this.createNewModule = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/module/api",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                    if (resp.status == 1) {
                        defer.resolve(true);
                    }
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;

            }

            this.updateModule = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'PUT',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/module/api",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                    if (resp.status == 1) {
                        defer.resolve(true);
                    }
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;
            }

            this.getModuleApiDetails = function(projectId, moduleId) {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/apis/project/' + projectId + '/module/' + moduleId})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(resp.apiList);
                            }

                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }

            this.deleteModule = function(moduleId) {
                var defer = $q.defer();
                $http({
                    method: 'DELETE',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/module/api/delete/" + moduleId,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                })
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(true);
                            }
                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }

            this.getAvailableApiInModule = function(moduleId) {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/module/api/isAPIavailable/' + moduleId})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(resp.apiCount);
                            }

                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }

        })

        .service('apiService', function($http, $q, loginService) {

            this.changeResponseSelectBox = function(requestId, responseId) {
                var defer = $q.defer();

                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/changeresponse/' + requestId + '/' + responseId})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(true);
                            }

                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }

            this.getResponseDetails = function() {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/masterData'})
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(resp.masterList);
                            }

                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }


            this.getAPiDetails = function(apiID) {
                var defer = $q.defer();
                $http({method: 'GET', url: GLOBAL.BASE_URL + '/bounceadmin/api/admin/requestDetails/' + apiID}).success(function(resp) {
                    if (resp.status == 1) {
                        defer.resolve(resp.apilist);
                    }

                });
                return defer.promise;
            }

            this.createNewApi = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/add",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                	 defer.resolve(resp.status);
                    
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;

            }

            this.editApi = function(obj) {
                var defer = $q.defer();
                $http({
                    method: 'POST',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/edit",
                    data: obj,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                }).success(function(resp) {
                	 defer.resolve(resp.status);
                	 
                }).error(function(resp) {
                    if (resp.status == -1) {
                        loginService.callLogOutApi();
                    }
                })
                return defer.promise;

            }

            this.deleteApi = function(apiId) {
                var defer = $q.defer();
                $http({
                    method: 'DELETE',
                    url: GLOBAL.BASE_URL + "/bounceadmin/api/admin/request/" + apiId,
                    headers: {'content-type': 'application/x-www-form-urlencoded'}
                })
                        .success(function(resp) {
                            if (resp.status == 1) {
                                defer.resolve(true);
                            }
                        })
                        .error(function(resp) {
                            if (resp.status == -1) {
                                loginService.callLogOutApi();
                            }
                        })
                return defer.promise;
            }

        })

        .service('apiCommonFunctionService', function($http, $q, ngDialog, $window) {

            this.setResponseRequestValuesFromServerForEdit = function($scope, resp) {
                $scope.selectedRequestContentType = $scope.initialRequestContentType;
                $scope.requestcontentType = resp.content_type;

                $scope.selectedRequestContentEncoding = $scope.initialRequestContentEncoding;
                $scope.requestcontentEncoding = resp.content_encoding;


                $scope.pageLoadResponseContentType = resp.content_type[0];
                $scope.selectedResponseContentType = resp.content_type[0];
                $scope.responsecontentType = resp.content_type;


                $scope.pageLoadResponseContentEncoding = resp.content_encoding[0];
                $scope.selectedResponseContentEncoding = resp.content_encoding[0];
                $scope.responsetcontentEncoding = resp.content_encoding;


                $scope.pageLoadResponseStatus = resp.response_status[0];
                $scope.selectedResponseStatus = resp.response_status[0];
                $scope.responseStatus = resp.response_status;
            }


            this.setResponseRequestValuesFromServer = function($scope, resp) {

                $scope.selectedRequestContentType = $scope.initialRequestContentType;
                $scope.requestcontentType = resp.content_type;

                $scope.selectedRequestContentEncoding = $scope.initialRequestContentEncoding;
                $scope.requestcontentEncoding = resp.content_encoding;

                $scope.selectedResponseContentType = $scope.initialResponseContentType;
                $scope.pageLoadResponseContentType = $scope.initialResponseContentType;
                $scope.responsecontentType = resp.content_type;

                $scope.selectedResponseContentEncoding = $scope.initialResponseContentEncoding;
                $scope.pageLoadResponseContentEncoding = $scope.initialResponseContentEncoding;
                $scope.responsetcontentEncoding = resp.content_encoding;

                $scope.selectedResponseStatus = $scope.InitialResponseStatus;
                $scope.pageLoadResponseStatus = $scope.InitialResponseStatus;
                $scope.responseStatus = resp.response_status;
            }

            this.createResponse = function(responseName, responseContent, $scope, index, responseArray) {
                var responses = {
                    "id": index,
                    "isActive": false,
                    "isBypass": false,
                    "serverurl": localStorage.projectServerUrl,
                    'name': responseName,
                    'statuscode': $scope.selectedResponseStatus,
                    'body': {
                        contents: responseContent
                    },
                    'header': {
                        'Content_Type': $scope.selectedResponseContentType,
                        'Accept': $scope.selectedResponseContentEncoding,
                    }
                };

                if ($scope.responseHeadersArray) {
                    var additionalHeader = [];
                    $scope.responseHeadersArray.forEach(function(header) {
                        additionalHeader.push({
                            id: header.id,
                            headerName: header.headerName,
                            headerValue: header.headerValue
                        });
                    });
                    responses.header.additionalHeader = additionalHeader;
                }
                responseArray.push(responses);
                $scope.response = responseArray;
                index++;
                ngDialog.close();

            }

            this.editResponse = function(responseName, responseContent, $scope) {
                $scope.response.forEach(function(resp) {
                    if (resp.id === $scope.clickedResponseId) {
                        resp.name = responseName;
                        resp.statuscode = $scope.selectedResponseStatus;
                        resp.body.contents = responseContent;
                        resp.header.Content_Type = $scope.selectedResponseContentType;
                        resp.header.Accept = $scope.selectedResponseContentEncoding;
                        resp.header.additionalHeader = $scope.responseHeadersArray;
                    }
                });
                ngDialog.close();
            }

            this.makeSelectedResponseActive = function($scope, response) {
                $scope.response.forEach(function(selectedresp) {
                    if (selectedresp.id === response.id) {
                        selectedresp.isActive = true;
                    }
                    else {
                        selectedresp.isActive = false;
                    }
                })
            }



            this.editClickedResponse = function($scope, clickedResponse) {
                if (clickedResponse.id !== 0) {
                    $scope.clickedResponseId = clickedResponse.id;
                    $scope.responseType = 'old';
                    $scope.responseName = clickedResponse.name;
                    $scope.responseContent = clickedResponse.body.contents;
                    $scope.InitialResponseStatus = clickedResponse.statuscode;
                    $scope.initialRequestContentEncoding = clickedResponse.header.Accept;
                    $scope.initialResponseContentType = clickedResponse.header.Content_Type;
                    ngDialog.open({template: 'views/projectView/createResponsePopup.html', scope: $scope, closeByDocument: false});
                }
                else {
                    $scope.clickedResponseId = clickedResponse.id;
                    ngDialog.open({template: 'views/projectView/ibounceResponsePopup.html', scope: $scope, closeByDocument: false});
                }
            }

            this.clickingAddResponse = function($scope) {
                $scope.responseType = 'new';
                $scope.responseName = '';
                $scope.responseContent = '';
                $scope.InitialResponseStatus = $scope.pageLoadResponseStatus;
                $scope.initialRequestContentEncoding = $scope.pageLoadResponseContentEncoding;
                $scope.initialResponseContentType = $scope.pageLoadResponseContentType;
                ngDialog.open({template: 'views/projectView/createResponsePopup.html', scope: $scope, closeByDocument: false});

            }

            this.getCommonDetails = function($scope) {
                $scope.projectId = (($window.location.hash).split('/')[2]).split(':')[1];
                $scope.moduleId = (($window.location.hash).split('/')[3]).split(':')[1];
                $scope.projectServerUrl = localStorage.projectServerUrl;
                $scope.responseUrl = (($window.location.href).split('//')[1]).split('/')[0] + "/" + localStorage.projectUrl + "/";
                //$scope.serverRequestName = $scope.projectServerUrl;
            }

            this.watchHeaderScope = function($scope) {
                $scope.$watch('responseHeaders', function() {
                    $scope.watchHeaderCount++;
                }, true);


                if ($scope.responseHeaders.length === 0 || $scope.clickedResponseId === 0) {
                    ngDialog.close();
                }
                else {
                    alert('Please Save Before Closing');
                }
            }

            this.initializeResponseHeader = function($scope) {
                $scope.responseHeaders = [];
                $scope.HeaderCount = 0;
                $scope.additionalHeaders = false;

            }
            this.showAdditionalHeaders = function($scope) {
                $scope.additionalHeaders = true;
                $scope.responseHeaders.push({'id': $scope.HeaderCount});
                $scope.HeaderCount++;
            }
            this.removeHeader = function($scope, header) {

                var i = 0;
                $scope.responseHeaders.forEach(function(head) {
                    if (head.id === header.id) {
                        $scope.responseHeaders.splice(i, 1);
                    }
                    i++;
                });

                if ($scope.responseHeaders.length === 0) {
                    $scope.additionalHeaders = false;
                }
            }

            this.finalObjectCreationForSave = function($scope) {
                var project = {};
                project.projectid = $scope.projectId;
                project.serverurl = $scope.projectServerUrl;

                var req = {
                    'moduleid': $scope.moduleId,
                    'displayname': $scope.name,
                    'path': $scope.path,
                    'method': $scope.method,
                    'body': {},
                    'header': {
                        'Content-Type': $scope.selectedRequestContentType,
                        'Accept': $scope.selectedRequestContentEncoding
                    }
                }

                $scope.response.forEach(function(resp) {
                    if (resp.id === 0) {
                        resp.serverurl = $scope.serverRequestName;
                        resp.isBypass = true;

                    }
                    else {
                        var adHeader = resp.header.additionalHeader;

                        resp.header = {
                            'Content-Type': resp.header.Content_Type,
                            'Accept': resp.header.Accept
                        }
                        if (adHeader.length > 0) {
                            resp.header.additionalHeader = adHeader;
                        }
                        if (resp.header.additionalHeader) {
                            resp.header.additionalHeader.forEach(function(adheader) {
                                delete adheader.id;
                                delete adheader.$$hashKey;
                            });
                        }
                    }
                    delete resp.id;
                });


                var obj = {'project': project, 'request': req, 'responses': $scope.response};

                return obj;
            }

        })

        .service('cssService', function($http, $window, $rootScope) {

            this.genarateBackgroundImageExceptLogin = function() {
                $('.bodyDiv').removeClass('section-bg');
                $('.bodyDiv').addClass('innerBg');
                $('.navigationWrapper').show();

            }
            this.genarateBackgroundImageLogin = function() {
                $('.bodyDiv').addClass('section-bg');
                $('.bodyDiv').removeClass('innerBg');
                $('.navigationWrapper').hide();
            }
            this.showPageAnimation = function() {

                $('.mainpage').addClass('pageAnimationEffect');

            }
            this.removePageAnimation = function() {
                $('.mainpage').removeClass('pageAnimationEffect');
            }
            this.showPageAnimationRight = function() {
                $('.mainpage').addClass('pageAnimationEffectRight');
            }
        })

        .service('Commonservice', function($http, $window, $rootScope, listProjectsService, $route) {

          var path;
            this.showAlertBox = function(msg,path) {
                $('.alertBox').show();
                $rootScope.showAlert = true;
                $rootScope.alertMessage = msg;
                path=path;
            }

            this.hideAlertBox = function() {
                $rootScope.showAlert = false;
                if(path='routePath'){
                	$route.reload();
                }
            }

            this.defaultIbounceResponseName = function() {
                return"From Server";
            }


            this.checkForAvailability = function(typedValue, lists, type) {
                if (type == 'project') {
                    lists.forEach(function(list) {
                        if (typedValue) {
                            if (typedValue.indexOf('/') !== -1) {
                                $rootScope.showProjectAvailability = true;
                                $rootScope.availabiltyMsg = '/ is not allowed in Project Name';
                            }
                            else if (list.proname.toLowerCase() === typedValue.toLowerCase()) {
                                $rootScope.showProjectAvailability = true;
                                $rootScope.availabiltyMsg = 'Project Already Exist';
                            }
                            else {
                                $rootScope.showProjectAvailability = false;
                            }
                        }
                    });
                }
                else if (type == 'module') {


                    lists.forEach(function(list) {

                        if (typedValue) {
                            if (list.modulename.toLowerCase() === typedValue.toLowerCase()) {
                                $rootScope.showModuleNameAvailability = true;
                                $rootScope.availabiltyMsg = 'Module Already Exist';
                            }
                            else {
                                $rootScope.showModuleNameAvailability = false;
                            }
                        }

                    });
                }
                else if (type === 'headerName') {
                    for (var i = 0; i < lists.length; i++) {
                        if (typedValue) {
                            if (lists[i].headerName.toLowerCase() === typedValue.toLowerCase()) {
                                $rootScope.showHeaderNameAvailability = true;
                                $rootScope.availabiltyMsg = 'Header Name Already Exist';
                                break;
                            }
                            else {
                                $rootScope.showHeaderNameAvailability = false;
                            }
                        }
                    }
                }

                else if (type === 'headerValue') {

                    for (var i = 0; i < lists.length; i++) {
                        if (typedValue) {
                            if (lists[i].headerValue.toLowerCase() === typedValue.toLowerCase()) {
                                $rootScope.showHeaderValueAvailability = true;
                                $rootScope.availabiltyHeaderValueMsg = 'Header Value Already Exist';
                                break;
                            }
                            else {
                                $rootScope.showHeaderValueAvailability = false;
                            }
                        }
                    }
                }
            }

        })
