var mythosApp = angular.module('mythosApp', [
  'ngRoute',
  'mythosControllers'
]);

mythosApp.config(['$routeProvider',
    function($routeProvider) {
        // Dashboard
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardCtrl'
        // Article detail
        }).when('/article/:articleId', {
            templateUrl: 'article.html',
            controller: 'ArticleDetailCtrl'
        // Article list
        }).when('/article-list/:pageType', {
            templateUrl: 'article-list.html',
            controller: 'ArticlesCtrl'
        // Default
        }).otherwise({
            redirectTo: '/dashboard'
        });
    }
]);

/**
 * ===============================================
 * Binding directives
 * ===============================================
 */

/**
 * Translations
 * @return void
 */
mythosApp.directive('translate', function() {
    return function(scope, element) {
        Mythos.translator.init(Mythos.settings.defaultLanguage);
    };
});

/**
 * Metis menu
 * @return void
 */
mythosApp.directive('metisMenu', function() {
    return function(scope, element, attrs) {
        $(element).metisMenu();
        $(window).bind("load resize", function() {
            var topOffset = 50,
                width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; // 2-row-menu
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }
            height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });        
    };
});

/**
 * Google analytics embed API
 * @return void
 */
mythosApp.directive('googleAnalytics', function() {
    return function(scope, element, attrs) {
        var tableId = attrs.googleAnalytics,
            clientId = scope.googleClientId;        
        gapi.analytics.ready(function() {
            /**
             * Authorize the user immediately if the user has already granted access.
             * If no access has been created, render an authorize button inside the
             * element with the ID "embed-api-auth-container".
             */
            gapi.analytics.auth.authorize({
                container: 'embed-api-auth-container',
                clientid: clientId,
            });

            /**
             * Create a new DataChart instance with the given query parameters
             * and Google chart options. It will be rendered inside an element
             * with the id "chart-container".
             */
            var dataChart = new gapi.analytics.googleCharts.DataChart({
                query: {
                    ids: 'ga:93592315',
                    metrics: 'ga:sessions',
                    dimensions: 'ga:date',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday'
                },
                chart: {
                    container: 'chart-container',
                    type: 'LINE',
                    options: {
                        width: '100%'
                    }
                }
            });

            dataChart.set({query: {ids: tableId}}).execute();
            $( window ).resize(function() { 
                dataChart.set({query: {ids: tableId}}).execute();
            });
        }); 
        //$(element).metisMenu();
    };
});