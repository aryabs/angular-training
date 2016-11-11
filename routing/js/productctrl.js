angular.module("myApp")
    .controller('ProductController', function($scope) {
        $scope.form = {};

        function getData() {
            // getting data from local storage
            var productArray = localStorage.getItem('data');
            productArray = productArray ? JSON.parse(productArray) : [];
            $scope.productArray = productArray;

        }
        getData();


        $scope.categoryArray = [{
            "id": "1",
            "type": "Mechanical"
        }, {
            "id": "2",
            "type": "Electrical"
        }, {
            "id": "3",
            "type": "plumbing"
        }]

        $scope.subArray = [{
            "sid": "1",
            "subtype": "Bearings",
            "id": "1"
        }, {
            "sid": "2",
            "subtype": "Cables",
            "id": "1"
        }, {
            "sid": "3",
            "subtype": "Machines",
            "id": "2"
        }, {
            "sid": "4",
            "subtype": "Safety instruments",
            "id": "2"
        }, {
            "sid": "5",
            "subtype": "Float Valve",
            "id": "3"
        }, {
            "sid": "6",
            "subtype": "Strainers",
            "id": "3"
        }]


        $scope.search = function() {


            var id = $scope.category.id;


            $scope.available = [];

            angular.forEach($scope.subArray, function(value) {


                if (value.id == $scope.category.id) {
                    $scope.available.push(value);

                }
            });
        }

    });