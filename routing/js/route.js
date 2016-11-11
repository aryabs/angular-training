var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "views/home.html"
        })
        .when("/about", {
            templateUrl: "views/about.html"
        })
        .when("/contact", {
            templateUrl: "views/contact.html",
            controller: "FormController"
        })
        .when("/contact listing", {
            templateUrl: "views/contactlist.html",
            controller: "FormListController"
        })
        .when("/products", {
            templateUrl: "views/products.html",
            controller: "ProductController"
        })
});