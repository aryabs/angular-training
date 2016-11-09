(function() {

    updateModuleController = function($scope, $location, $http, $q, $route, moduleService) {
        $scope.projectId = (window.location.hash).split('/').reverse()[0];
        var updatingModuleDetails = moduleService.updateModule($scope.projectId);
        updatingModuleDetails.then(function(resp) {
            
        });

    }

    window.Controllers = window.Controllers || {};
    window.Controllers.updateModuleController = updateModuleController;

})();