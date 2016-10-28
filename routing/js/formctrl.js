angular.module("myApp")
.controller('FormController',function($scope,$log){
	$scope.form = {};
	$scope.formSubmit = function(){
		$log.debug('last name',$scope.form);
		localStorage.setItem('data',JSON.stringify($scope.form));
	}
});

