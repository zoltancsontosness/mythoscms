var mythosApp = angular.module('mythosApp', [
    'ngRoute',
    'mythosControllers',
    'ui.bootstrap'
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
        }).when('/article-list', {
            templateUrl: 'article-list.html',
            controller: 'ArticlesCtrl'
        // Logout
        }).when('/logout', {
            templateUrl: 'login.html',
            controller: 'LogoutCtrl'
        // Default
        }).otherwise({
            redirectTo: '/logout'
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
 * Summernote
 * @return void
mythosApp.directive('summerNote', function() {
    return function(scope, element, attrs) {          
        $('.summernote').summernote({
            height: 300,
            toolbar: [
                ['misc', ['codeview', 'fullscreen']],
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'fontsize']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['picture']]
            ],
            onpaste: function(e) {
                var note = $(this),
                    updateContent = function (note) {
                        var content = note.html(),
                            clean = Mythos.stripTags(content);
                        note.code('').html(clean);
                    };
                setTimeout(function() {
                    updateContent(note);   
                }, 100);
            }
        });     
    }
});
 */

/**
 * Tab bindings
 * @return void
 */
mythosApp.directive('bootstrapTabs', function() {
    return function (scope, element, attrs) {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(this).attr('data-href');
            $('.tab-pane').removeClass('in active');
            $(target).addClass('in active');
        });
    }
});

/**
 * Bootstrap accordion bindings
 * @return void
 */
mythosApp.directive('bootstrapAccordion', function() {
    return function(scope, element, attrs) {
        $('a[data-toggle="collapse"]').on('click', function(e) {
            var target = $(this).attr('data-href');
            $('.collapse.in').collapse('hide');
            $(target).collapse('show');
        });
    }
});

/**
 * Ligthbox bindings
 * @return void
 */
mythosApp.directive('lightBox', function() {
    return function(scope, element, attrs) {
        $(element).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });     
    }
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
            if (gapi.analytics.auth.isAuthorized() === false) {
                gapi.analytics.auth.authorize({
                    container: 'embed-api-auth-container',
                    clientid: clientId,
                });
            }

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
    };
});