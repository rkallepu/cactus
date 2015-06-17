angular.module('rideshareApp.home', []).controller('homeCont', function($scope, $location,Routes,Account){
    console.log('Inside home controller');
    console.log($scope);
    //console.log(Account.user.user.name);
    if(Account.user === null){
        $location.path('/login');
    }else {
        $scope.update(false, true, true);
        $scope.name = Account.user.user.name;
        var route = {};
        $scope.seeAllRoutes = function () {
            Routes.retrieveRoutes().then(function (data) {
                console.log(data);
                $scope.routes = data;
            }, function (err) {
                console.log('error here....', err);
            });
        };
        $scope.addRoute = function () {
            route.srcloc = {type: 'Point', coordinates: [Number($scope.sourcelng), Number($scope.sourcelt)]};
            route.dstloc = {type: 'Point', coordinates: [Number($scope.destinationlng), Number($scope.destinationlt)]};
            console.log(route);
            Routes.saveRoute(route).success(function () {
                console.log('Route added');
                //Routes.retrieveRoutes();
            });
        };
        var newSearch = {};
        $scope.searchRoutes = function () {
            newSearch = {lng: Number($scope.searchSrcLon), lat: Number($scope.searchSrcLat)};
            Routes.searchRoutes(newSearch).then(function (data) {
                console.log(data);
                //$scope.routes = data;
                $scope.searchedRoutes = data;
            }, function (err) {
                console.log('error here....', err);
            });
        };
    }
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
        searchRoutes: function (newSearch) {
            return $q(function (resolve, reject) {
                var req = {
                    method: 'GET',
                    url: '/searchRoutes',
                    params: {
                        lng: newSearch.lng,
                        lat: newSearch.lat
                    }
                };
                $http(req).success(function (data){
                    resolve(data);
                }).error(function (data) {
                    reject(data);
                });
            });
        }
    };
});