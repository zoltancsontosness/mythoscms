var mythosControllers = angular.module('mythosControllers', []);

mythosControllers.controller('DashboardCtrl', ['$scope', '$http',
    function ($scope, $http) {
        
        // Default variables
        $scope.isLoading = true;
        
        // Loads dashboard data
        $http.get('sample-data/dashboard.json').success(function(data) {
            $scope.dashboardData = data;
            $scope.googleClientId = data.googleClientId;
            $scope.isLoading = false;
        });        
                
    }
]);

// Logout
mythosControllers.controller('LogoutCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
    }
]);
        
mythosControllers.controller('GetCurrentUsersCtrl', ['$scope', '$http', 
    function($scope, $http) {
        
        // Default variables
        $scope.isLoading = true;        
        
        // Loads logged user data
        $http.get('sample-data/user-data.json').success(function(data) {
            $scope.userData = data;
            $scope.isLoading = false;
        }).error(function(data, status, headers) {
            // Error handling
        });  
    }
]);

mythosControllers.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
    }
]);

mythosControllers.controller('ArticleDetailCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
    }
]);