
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
        //removing row 
	  	$scope.removeRow = function(item){	

		  	var array=localStorage.getItem('data');
		  	array=JSON.parse(array);
		  	array.splice(array.indexOf(item),1);
		  	array= JSON.stringify(array);
		  	localStorage.setItem('data', array);
		  	$scope.dataArray.splice($scope.dataArray.indexOf(item),1)
		};
});
// definition of titlecase filter
angular.module("myApp").filter('titleCase', function() {
	    return function(input) {
	    input = input;
	    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      
  }
});

 angular.module("myApp").directive('contactInfo', function(){

       

 	return {
 			// restrict:"AE",
    //     	scope: {
    //         	dataarray: '='
    //     	},
        	// template: '<ul><li ">{{dataarray}}</li></ul>'
        	scope: {
      			dataarray: '@'
         	},
        	 template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;

              $(el).popover({
                trigger: 'click',
                html: true,
                content: scope.dataarray,
                placement: "top"
            });
        }


 }
});