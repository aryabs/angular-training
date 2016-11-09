'use strict';

/* Directives */


angular.module('myApp.directives', ['ngDialog'])

        .directive('ngEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keypress", function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            scope.$eval(attrs.ngEnter, {'event': event});
                        });
                        event.preventDefault();
                    }
                });
            };
        })


        .directive('bindOnce', function() {
            return {
                scope: true,
                link: function($scope) {
                    setTimeout(function() {
                        $scope.$destroy();
                    }, 0);
                }
            }
        })





        .directive('numbersOnly', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, modelCtrl) {
                    modelCtrl.$parsers.push(function(inputValue) {
                        // this next if is necessary for when using ng-required on your input. 
                        // In such cases, when a letter is typed first, this parser will be called
                        // again, and the 2nd time, the value will be undefined
                        if (inputValue == undefined)
                            return ''
                        var transformedInput = inputValue.replace(/[^\d.\',']/g, '');

                        var point = transformedInput.indexOf(".");
                        if (point >= 0) {
                            transformedInput = transformedInput.slice(0, point + 3);
                        }

                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }

                        var decimalSplit = transformedInput.split(".");
                        var intPart = decimalSplit[0];
                        var decPart = decimalSplit[1];


                        intPart = intPart.replace(/[^\d]/g, '');
                        if (intPart.length > 3) {
                            var intDiv = Math.floor(intPart.length / 3);
                            while (intDiv > 0) {
                                var lastComma = intPart.indexOf(",");
                                if (lastComma < 0) {
                                    lastComma = intPart.length;
                                }

                                if (lastComma - 3 > 0) {
                                    intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
                                }
                                intDiv--;
                            }
                        }

                        if (decPart === undefined) {
                            decPart = "";
                        }
                        else {
                            decPart = "." + decPart;
                        }


                        var res = intPart + decPart;


                        if (res != transformedInput) {
                            modelCtrl.$setViewValue(res);
                            modelCtrl.$render();
                        }

                        return transformedInput;
                    });
                }
            };
        })




