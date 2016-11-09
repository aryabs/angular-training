(function() {

    editApiController = function($scope, $q, $location, $route, $window, $http, apiCommonFunctionService, cssService, ngDialog, apiService, Commonservice) {
        cssService.showPageAnimation();
        apiCommonFunctionService.getCommonDetails($scope);

        $scope.apiID = (($window.location.hash).split('/')[4]).split(':')[1];


        var gettingResponseDetails = apiService.getResponseDetails();
        gettingResponseDetails.then(function(resp) {
            var gettingApiDetails = apiService.getAPiDetails($scope.apiID);
            gettingApiDetails.then(function(apiDetails) {

                $scope.requestDetails = apiDetails[0].request;
                $scope.responseDetails = apiDetails[1].responses;

                $scope.name = $scope.requestDetails.displayname;
                $scope.path = $scope.requestDetails.path;

                $scope.initialRequestContentType = $scope.getContentTypeStringifyValue($scope.requestDetails.header);
                $scope.initialRequestContentEncoding = $scope.requestDetails.header.Accept;

                $scope.radioVerbselection = $scope.setMethodType($scope.requestDetails.method);
                $scope.method = $scope.requestDetails.method;


                apiCommonFunctionService.setResponseRequestValuesFromServerForEdit($scope, resp);
                $scope.createResponseDiv();
                $window.setTimeout(function() {
                    var i = 0;
                    $scope.responseDetails.forEach(function(respDetail) {
                        if (respDetail.enabled === '1') {
                            $('.responseRadioButton' + i).attr('checked', true);
                        }
                        i++;
                    });

                }, 1000);
            });
        });


        $scope.setMethodType = function(method) {
            switch (method) {

                case 'GET':
                    return 1;
                    break;
                case 'POST':
                    return 2;
                    break;
                case 'PUT':
                    return 3;
                    break;
                case 'PATCH':
                    return 4;
                    break;
                case 'DELETE':
                    return 5;
                    break;
                case 'OPTIONS':
                    return 6;
                    break;


            }


        }

        $scope.getSelectedRequestContentType = function(contentType) {
            $scope.selectedRequestContentType = contentType;
        }

        $scope.getSelectedRequestContentEncoding = function(contentEncoding) {
            $scope.selectedRequestContentEncoding = contentEncoding;
        }

        $scope.getSelectedResponseContentType = function(contentType) {
            $scope.selectedResponseContentType = contentType;
        }

        $scope.getSelectedResponseContentEncoding = function(contentEncoding) {
            $scope.selectedResponseContentEncoding = contentEncoding;
        }

        $scope.getSelectedResponseStatus = function(responseStatus) {
            $scope.selectedResponseStatus = responseStatus;
        }

        $scope.saveApi = function() {
            var obj = apiCommonFunctionService.finalObjectCreationForSave($scope);

            obj.request.api_id = $scope.apiID;
            var editingApi = apiService.editApi(obj);
            editingApi.then(function(status) {
            	var path='routePath'
                    if (status===1) {
                        $window.location.hash = '/projectDetails/' + $scope.projectId;
                    }
                    else if(status===2){
                    	Commonservice.showAlertBox("Path Already Exists",path);
                    }
            });
        }

        $scope.selectedRadioVerb = function(radioVerb) {
            $scope.method = radioVerb;
        }


        $scope.getContentTypeStringifyValue = function(val) {
            var Content_Type = val['Content-Type'];
            return Content_Type;
        }

        $scope.checkForEnabledOnPageLoad = function(response) {
            if (response.enabled == '1') {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.createResponseDiv = function() {
            var lastValue;
            for (var i = 0; i < $scope.responseDetails.length; i++) {
                if ($scope.responseDetails[i].isBypass === true) {
                    lastValue = $scope.responseDetails[i];
                    $scope.responseDetails.splice(i, 1);
                    break;
                }
            }
            $scope.responseDetails.unshift(lastValue);

            $scope.response = [];
            $scope.responseIndex = 0;
            $scope.responseDetails.forEach(function(response) {
                if (response.isBypass === false) {
                    var Content_Type = $scope.getContentTypeStringifyValue(response.header);
                    var responses = {
                        "id": $scope.responseIndex,
                        "isActive": $scope.checkForEnabledOnPageLoad(response),
                        "isBypass": false,
                        "serverurl": localStorage.projectServerUrl,
                        'name': response.name,
                        'statuscode': response.statuscode,
                        'body': {
                            contents: response.body
                        },
                        'header': {
                            'Content_Type': Content_Type,
                            'Accept': response.header.Accept

                        }
                    };

                    if (response.header.additionalHeader) {
                        var additionalHeader = [];
                        response.header.additionalHeader.forEach(function(header, index) {
                            additionalHeader.push({
                                id: index,
                                headerName: header.headerName,
                                headerValue: header.headerValue
                            });
                        });
                        responses.header.additionalHeader = additionalHeader;
                    }
                    $scope.response.push(responses);
                    $scope.responseIndex++;
                }

                else {
                    $scope.serverRequestName = response.serverurl;
                    var responses = {
                        "id": $scope.responseIndex,
                        "isActive": $scope.checkForEnabledOnPageLoad(response),
                        "isBypass": true,
                        "serverurl": response.serverurl,
                        'name': Commonservice.defaultIbounceResponseName()
                    };
                    $scope.response.push(responses);
                    $scope.responseIndex++;

                }

            });
        }



        $scope.createOrUpdateResponse = function(responseContent, responseName, responseHeaders) {
            $scope.responseHeadersArray = [];
            $scope.responseHeadersArray = responseHeaders;
            if ($scope.responseType === 'new') {
                apiCommonFunctionService.createResponse(responseName, responseContent, $scope, $scope.responseIndex, $scope.response);
            }
            else {
                apiCommonFunctionService.editResponse(responseName, responseContent, $scope);
            }
        }

        $scope.selectedResponse = function(response) {

            apiCommonFunctionService.makeSelectedResponseActive($scope, response);
        }

        $scope.addResponse = function() {
            $scope.initializeResponseHeader();
            $scope.additionalHeaders = false;
            $scope.initialResponseContentType = $scope.pageLoadResponseContentType;
            $scope.initialResponseContentEncoding = $scope.pageLoadResponseContentEncoding;
            $scope.InitialResponseStatus = $scope.pageLoadResponseStatus;
            apiCommonFunctionService.clickingAddResponse($scope);
        }

        $scope.editClickedResponse = function(clickedResponse) {
            $scope.responseType = 'old';
            if (clickedResponse.id > 0) {
                $scope.createHeaderArray(clickedResponse);
                if (clickedResponse.header.additionalHeader.length > 0) {
                    $scope.additionalHeaders = true;
                    $scope.responseHeaders = clickedResponse.header.additionalHeader;
                }
                else {
                    $scope.initializeResponseHeader();
                }
            }
            if (clickedResponse.id !== 0) {
                $scope.watchHeaderCount = 0;
                $scope.clickedResponseId = clickedResponse.id;
                $scope.responseName = clickedResponse.name;
                $scope.responseContent = clickedResponse.body.contents;

                $scope.InitialResponseStatus = clickedResponse.statuscode;
                $scope.initialResponseContentEncoding = clickedResponse.header.Accept;
                $scope.initialResponseContentType = clickedResponse.header.Content_Type;

                $scope.selectedResponseContentEncoding = $scope.initialResponseContentEncoding;
                $scope.selectedResponseStatus = $scope.InitialResponseStatus;
                $scope.selectedResponseContentType = $scope.initialResponseContentType;

                ngDialog.open({template: 'views/projectView/createResponsePopup.html', scope: $scope, closeByDocument: false});

            }
            else {
                $scope.clickedResponseId = clickedResponse.id;
                ngDialog.open({template: 'views/projectView/ibounceResponsePopup.html', scope: $scope, closeByDocument: false});
            }


        }


        $scope.createHeaderArray = function(clickedResponse) {
            $scope.checkHeaderarray = [];
            clickedResponse.header.additionalHeader.forEach(function(header) {
                $scope.checkHeaderarray.push({'headerName': header.headerName, 'headerValue': header.headerValue, });
            })
        }

        $scope.changeCommonRequestName = function(commonrequestName) {
            $scope.serverRequestName = commonrequestName;
            ngDialog.close();
        }

        $scope.initializeResponseHeader = function() {
            apiCommonFunctionService.initializeResponseHeader($scope);

        }
        apiCommonFunctionService.initializeResponseHeader($scope);

        $scope.showAdditionalHeaders = function() {
            apiCommonFunctionService.showAdditionalHeaders($scope);
        }

        $scope.removeHeader = function(header) {

            apiCommonFunctionService.removeHeader($scope, header);
        }

        $scope.closePopup = function() {
            $route.reload();
            //apiCommonFunctionService.watchHeaderScope($scope);
            ngDialog.close();
        }

        $scope.checkForAvilabilityOfHeaderName = function(headerName) {
            var type = 'headerName';
            if (typeof $scope.checkHeaderarray === 'undefined') {

            }
            else {
                Commonservice.checkForAvailability(headerName, $scope.checkHeaderarray, type);
            }

        }

        $scope.checkForAvilabilityOfHeaderValue = function(headerValue) {
            var type = 'headerValue';
            if (typeof $scope.checkHeaderarray === 'undefined') {

            }
            else {
                Commonservice.checkForAvailability(headerValue, $scope.checkHeaderarray, type);
            }

        }

        $scope.checkForJsonValidity = function(value) {
            //console.log(value);
            //var a= JSON.parse(value);
            // var c = jQuery.parseJSON( value )
        }

        $scope.backButton = function() {
            //cssService.showPageAnimationRight();
            $window.location.hash = '/projectDetails/' + $scope.projectId;

        }

    }

    window.Controllers = window.Controllers || {};
    window.Controllers.editApiController = editApiController;

})();