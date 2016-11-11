angular.module("myApp")
    .directive('imageChange', function() {
        return {
            link: function(scope, ele) {
                $(ele).on('change', function(e) {
                    var files = e.target.files;
                    angular.forEach(files, function(file, i) {
                        var fileReader = new FileReader();
                        fileReader.onload = function(event) {
                            //console.log(fileReader.result);
                            $(ele).next().append("<img src='" + fileReader.result + "'/>")
                            scope.fileUrl = fileReader.result;


                        };
                        fileReader.readAsDataURL(file);
                    });
                });
            }
        }
    })
    .controller('ProductController', function($scope) {
        $scope.imageStrings = [];
        $scope.form = {};

        function getData() {
            // for populating select users drop down
            var productArray = localStorage.getItem('data');
            productArray = productArray ? JSON.parse(productArray) : [];
            $scope.productArray = productArray;


        }
        getData();
        // console.log($scope.fileUrl);

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


            var id = $scope.form.category.id;


            $scope.available = [];

            angular.forEach($scope.subArray, function(value) {


                if (value.id == $scope.form.category.id) {
                    $scope.available.push(value);

                }
            });
        }

        // $scope.save = function() {

        //     var name = $scope.form.productname;
        //     var pname = $scope.form.category.type;
        //     var sname = $scope.form.subcategory.subtype;

        // }



        $scope.productformSubmit = function() {
            $scope.form.image = $scope.fileUrl;

            var product = $scope.form;
            var pArray = localStorage.getItem('product');
            pArray = pArray ? JSON.parse(pArray) : [];
            pArray.push(product);
            localStorage.setItem('product', JSON.stringify(pArray));

            var retrievedData = JSON.parse(localStorage.getItem("product"));
            console.log(retrievedData);


        }




    });