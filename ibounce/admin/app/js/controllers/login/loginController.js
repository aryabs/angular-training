(function() {

    loginController = function($scope, $location, $http, loginService, cssService, $rootScope) {
        $scope.loginButtonClicked = function(userName, password) {
            var obj = {};
            obj.userName = userName;
            obj.password = password;
            $scope.credentials = 'username=' + userName + '&password=' + password;
            loginService.callLoginApi($scope.credentials, $scope);  
        }
    }

    window.Controllers = window.Controllers || {};
    window.Controllers.loginController = loginController;

})();