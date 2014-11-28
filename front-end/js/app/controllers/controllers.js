var mythosControllers = angular.module('mythosControllers', []);


mythosControllers.controller('DashboardCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.googleClientId = '517921597420-1vqvkqrc0jhg4qu4kk9skpp692u260e9.apps.googleusercontent.com';
    }
]);

mythosControllers.controller('ArticlesCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
    }
]);

mythosControllers.controller('ArticleDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
    }
]);