(function() {

    createApiController = function($scope, $location, $route, $window, $http, apiCommonFunctionService, cssService, Commonservice, ngDialog, apiService) {
        cssService.showPageAnimation();
        apiCommonFunctionService.getCommonDetails($scope);
        var gettingResponseDetails = apiService.getResponseDetails();
        $scope.serverRequestName = $scope.projectServerUrl;
        gettingResponseDetails.then(function(resp) {
            $scope.initialRequestContentType = resp.content_type[0];
            $scope.initialRequestContentEncoding = resp.content_encoding[0];
            $scope.initialResponseContentType = resp.content_type[0];
            $scope.initialResponseContentEncoding = resp.content_encoding[0];
            $scope.InitialResponseStatus = resp.response_status[0];

            apiCommonFunctionService.setResponseRequestValuesFromServer($scope, resp);

            $scope.radioVerbselection = 1;
            $scope.method = 'GET';
            $('.responseRadioButton0').attr('checked', true);

        });

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

            var creatingNewApi = apiService.createNewApi(obj);
            creatingNewApi.then(function(status) {
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

        var responseArray = [];
        responseArray.push({'id': 0, 'name': Commonservice.defaultIbounceResponseName()});
        $scope.response = responseArray;
        $scope.response[0].isActive = true;


        var index = 1;
        $scope.createOrUpdateResponse = function(responseContent, responseName, responseHeaders) {

            $scope.responseHeadersArray = [];
            $scope.responseHeadersArray = responseHeaders;
            if ($scope.responseType === 'new') {
                apiCommonFunctionService.createResponse(responseName, responseContent, $scope, index, responseArray);
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
            apiCommonFunctionService.clickingAddResponse($scope);
        }


        $scope.editClickedResponse = function(clickedResponse) {

            if (clickedResponse.id > 0) {
                $scope.createHeaderArray(clickedResponse);
                $scope.responseHeaders = clickedResponse.header.additionalHeader;
            }
            apiCommonFunctionService.editClickedResponse($scope, clickedResponse);
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

        $scope.createHeaderArray = function(clickedResponse) {
            $scope.checkHeaderarray = [];
            clickedResponse.header.additionalHeader.forEach(function(header) {
                $scope.checkHeaderarray.push({'headerName': header.headerName, 'headerValue': header.headerValue, });
            })
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

        $scope.backButton = function() {
            $window.location.hash = '/projectDetails/' + $scope.projectId;
        }

    }

    window.Controllers = window.Controllers || {};
    window.Controllers.createApiController = createApiController;
})();