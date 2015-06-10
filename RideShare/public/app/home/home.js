angular.module('rideshareApp.home', []).controller('homeCont', function($scope, $location,Routes,Account){
    console.log('Inside home controller');
    $scope.name = Account.user.user.name;
    var route = {};
    Routes.retrieveRoutes().then(function (data) {
        console.log(data);
        $scope.routes = data;
    },function(err){
        console.log('error here....',err);
    });
    $scope.addRoute = function (){
        route.sourcelng = $scope.sourcelng;
        route.sourcelt = $scope.sourcelt;
        route.destinationlng = $scope.destinationlng;
        route.destinationlt = $scope.destinationlt;
        console.log(route);
        Routes.saveRoute(route).success(function(){
           console.log('Route added');
        });
    };
    $scope.searchRoutes = function(){
        Routes.searchRoutes().then(function (data) {
            console.log(data);
            //$scope.routes = data;
        },function(err){
            console.log('error here....',err);
        });

    };
}).service('Routes', function($q,$http){
    var _user =null;
    return {
        saveRoute: function(route){
            console.log(route);
            return $http.post('/info', route);
        },
        retrieveRoutes: function () {
            return $q(function (resolve, reject) {
                $http.get('/getRoutes').success(function (data) {
                    resolve(data);
                }).error(function (data) {
                    reject(data);
                });
            });
        },
        searchRoutes: function () {
            return $q(function (resolve, reject) {
                $http.get('/searchRoutes').success(function (data) {
                    resolve(data);
                }).error(function (data) {
                    reject(data);
                });
            });
        }
    };
});

