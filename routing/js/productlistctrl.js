angular.module("myApp")
    .controller('ProductlistController', function($scope) {
        function getData() {
            // getting data from local storage
            var tableArray = localStorage.getItem('product');
            tableArray = tableArray ? JSON.parse(tableArray) : [];
            $scope.tableArray = tableArray;
            // console.log(tableArray);
        }

        getData();

    });