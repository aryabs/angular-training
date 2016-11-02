

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


});

angular.module("myApp").filter('titleCase', function() {
    return function(input) {
      input = input;
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      
  }
});