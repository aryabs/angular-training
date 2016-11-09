angular.module("myApp")
.controller('ProductController',function($scope)
	{
		
		function getData(){
		// getting data from local storage
				var dataArray= localStorage.getItem('data');
				dataArray= dataArray ? JSON.parse(dataArray) : [];
				$scope.dataArray = dataArray;
				console.log(dataArray);
		}
		getData();


		$scope.categoryArray=[
			{"id":"1","type":"Mechanical"},
			{"id":"2","type":"Electrical"},
			{"id":"3","type":"plumbing"}
		]
	});
