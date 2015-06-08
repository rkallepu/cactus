angular.module('rideshareApp', ['ngRoute', 'rideshareApp.accounts','rideshareApp.home']).config(function ($routeProvider){
    $routeProvider.when('/register', {
        templateUrl: '/app/accounts/_register.html',
        controller: 'registerCont'
    }).when('/login', {
        templateUrl: '/app/accounts/_login.html',
        controller: 'loginCont'
    }).when('/logout', {
        templateUrl: '/app/accounts/_logout.html'
    }).when('/info', {
        templateUrl: '/app/home/_info.html',
        controller: 'homeCont'
    }).otherwise({
        redirectTo: '/'

    });
}).run(function (){
});

