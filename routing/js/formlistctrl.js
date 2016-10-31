angular.module("myApp")
.controller('FormListController',function($scope){
	
	function getData(){
		var dataArray = localStorage.getItem('data');
		dataArray = dataArray ? JSON.parse(dataArray) : [];
		$scope.dataArray = dataArray;

	}
	getData();

	});
