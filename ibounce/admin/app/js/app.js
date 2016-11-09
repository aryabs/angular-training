'use strict';


var GLOBAL = {
    BASE_URL: ''
}

//https://192.168.20.88:9443
//https://192.168.4.10:8443

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        //$httpProvider.defaults.withCredentials = true;

        $routeProvider.when('/',
                {
                    templateUrl: 'views/login/login.html',
                    controller: 'loginController'
                }
        );
        $routeProvider.when('/listProjects',
                {
                    templateUrl: 'views/projectView/listProjects.html',
                    controller: 'listProjectsController'

                }
        );
        $routeProvider.when('/projectDetails/:Id',
                {
                    templateUrl: 'views/projectView/projectDetails.html',
                    controller: 'projectDetailsController'
                }
        );
        $routeProvider.when('/createNewProject',
                {
                    templateUrl: 'views/projectView/createNewProject.html',
                    controller: 'createNewProjectController'
                }
        );
        $routeProvider.when('/editApi/projectId:Id/moduleId:Id/apiId:Id',
                {
                    templateUrl: 'views/projectView/editApi.html',
                    controller: 'editApiController'
                }
        );
        $routeProvider.when('/createApi/projectId:Id/moduleId:Id/newApi',
                {
                    templateUrl: 'views/projectView/editApi.html',
                    controller: 'createApiController'
                }
        );
        //$locationProvider.html5Mode(true);


    }])

        .run(function($rootScope, $location, $window, loginService, cssService, Commonservice) {

            $rootScope.$on('$routeChangeStart', function() {

                $rootScope.removeAlertBox = function() {
                    Commonservice.hideAlertBox();
                }

                $rootScope.logout = function() {
                    loginService.callLogOutApi();
                }

                $rootScope.homePage = function() {
                    $window.location.hash = '/listProjects/';
                }
                if (($window.location.hash).split('/').reverse()[0] == '') {
                    cssService.genarateBackgroundImageLogin();
                }
                else {
                    cssService.genarateBackgroundImageExceptLogin();
                }

                if (($window.location.hash).split('/')[1] == 'editApi') {
                    // cssService.showPageAnimation();
                }
                else {

                    cssService.removePageAnimation();

                }


            });
        });
















