angular.module("myApp")
    .controller('FormController', function($scope) {
        // creating from object
        $scope.form = {};

        $scope.formSubmit = function() {

            // console.log($scope.form.firstName);

            // $log.debug('last name',$scope.form);
            var data = $scope.form;
            var dataArray = localStorage.getItem('data');
            dataArray = dataArray ? JSON.parse(dataArray) : [];
            dataArray.push(data);
            localStorage.setItem('data', JSON.stringify(dataArray));
            // dataArray=JSON.stringify(dataArray);
            var retrievedData = localStorage.getItem("data");
            // console.log(dataArray);

            $scope.dataArray = dataArray;
        }




    });