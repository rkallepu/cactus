var app = angular.module('rideshareApp', ['rideshareApp.accounts','rideshareApp.home', "ui.router"]).config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "viewA": {
                    templateUrl: '/app/accounts/_home.html'
                }
            }
        }).state('register', {
            url: "/register",
            views: {
                "viewA": {
                    templateUrl: '/app/accounts/_register.html',
                    controller: 'registerCont'
                }
            }
        }).state('login', {
            url: "/login",
            views: {
                "viewA": {
                    templateUrl: '/app/accounts/_login.html',
                    controller: 'loginCont'
                }
            }
        }).state('info', {
            url: "/info",
            views: {
                "viewA": {
                    templateUrl: '/app/home/_info.html',
                    controller: 'homeCont'
                }
            }
        });
    $urlRouterProvider.otherwise("/");
});
/*angular.module('rideshareApp', ['ngRoute', 'rideshareApp.accounts','rideshareApp.home']).config(function ($routeProvider){
 $routeProvider.when('/home',{
 templateUrl: '/app/accounts/_home.html'
 }).when('/register', {
 templateUrl: '/app/accounts/_register.html',
 controller: 'registerCont'
 }).when('/login', {
 templateUrl: '/app/accounts/_login.html',
 controller: 'loginCont'
 }).when('/logout', {
 templateUrl: '/app/accounts/_logout.html'
 }).when('/info', {
 templateUrl: '/app/home/_info.html',
 controller:'homeCont'
 }).otherwise({
 redirectTo: '/'
 });
 }).run(function (){
 });*/

