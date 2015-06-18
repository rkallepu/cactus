angular.module('rideshareApp.home', ['homeFilter']).controller('homeCont', function($scope, $location,Routes,Account, $q){
    //console.log('Inside home controller');
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
            route.uuid = Routes.uuid();
            route.username = $scope.name;
            route.srcAddr = $scope.addressSrc;
            route.dstAddr = $scope.addressDst;
            $q.all([Routes.getGeocodes({'address' : $scope.addressSrc}),Routes.getGeocodes({'address': $scope.addressDst})]).then(function(results){
                route.srcloc = {type: 'Point', coordinates: [results[0][0].geometry.location.F, results[0][0].geometry.location.A]};
                route.dstloc = {type: 'Point', coordinates: [results[1][0].geometry.location.F, results[1][0].geometry.location.A]};
                console.log(route);
                Routes.saveRoute(route).success(function () {
                    console.log('Route added');
                });
            });
        };
        var newSearch = {};
        $scope.searchRoutes = function () {
            var srclatlng;
            $q.all([Routes.getGeocodes({'address' : $scope.searchSrcAddr}),Routes.getGeocodes({'address': $scope.searchDestAddr})]).then(function(results){
                //console.log('inside promises..',results);
                srclatlng = [results[0][0].geometry.location.F, results[0][0].geometry.location.A];
                $scope.dstlatlng = [results[1][0].geometry.location.F, results[1][0].geometry.location.A];

                newSearch = {lng: srclatlng[0], lat: srclatlng[1], radius: Number($scope.radius)};
                Routes.searchRoutes(newSearch).then(function (data) {
                    //console.log(data);
                    $scope.searchedRoutes = data;
                }, function (err) {
                    console.log('error here....', err);
                });
            });
        };
    }
}).service('Routes', function($q,$http){
    var _user =null;
    return {
        uuid: function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        logout: function(){
            //console.log('calling logout service');
          return $http.get('/logout');
        },
        getGeocodes: function(address){
          return $q(function (resolve, reject) {
              var geo = new google.maps.Geocoder;
              geo.geocode(address, function(results, status){
                  if(status === google.maps.GeocoderStatus.OK){
                      resolve(results);
                  }
                  else{
                      reject(results);
                  }
              });
          });
        },
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
                        lat: newSearch.lat,
                        radius: newSearch.radius
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