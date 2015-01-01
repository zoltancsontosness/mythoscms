var mythosControllers = angular.module('mythosControllers', []);

mythosControllers.controller('DashboardCtrl', ['$scope', '$http',
    function ($scope, $http) {
        
        // Default variables
        $scope.isLoading = true;
        $scope.selectedNavItem = "dashboard";
        
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

/**
 * Default articlecontroller
 * @return void
 */
mythosControllers.controller('ArticlesCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.selectedNavItem = "articles";
    }
]);

mythosControllers.controller('ArticleDetailCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.isLoading = true;
        $scope.selectedNavItem = "article-detail";
        $http.get('sample-data/article.json').success(function(data) {
            $scope.articleData = data;
            $scope.isLoading = false;
        });
    }
]);