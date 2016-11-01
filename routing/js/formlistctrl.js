

// controlling the contactlist page
angular.module("myApp")
.controller('FormListController',function($scope)
{
	
	function getData(){
		// getting data from local storage
		var dataArray= localStorage.getItem('data');
		dataArray= dataArray ? JSON.parse(dataArray) : [];
		$scope.dataArray = dataArray;

	}
	//populating dataarray

	getData();
	
	// sorting function
  	$scope.sort=function(param)	{ 
	 	
	  	$scope.orderByField = param;	
	  	$scope.reverseSort = !$scope.reverseSort;
	  	
	  	
  	}

// app.filter('titleCase', function () {
//   return function (item) {
//   	item =$scope.firstName;
//   	console.log(item);
//     // return item.toUpperCase();
  // };

// });

});
