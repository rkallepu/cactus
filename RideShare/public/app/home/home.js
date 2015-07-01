angular.module('rideshareApp.home', ['ui.map', 'ui.bootstrap','smart-table', 'ngMaterial']).controller('homeCont', function($scope, $location, Routes, Account, $q, $filter, $state){
    //console.log('Inside home controller');
    "use strict";
    $scope.update(false, true, true);
    $scope.name = Account.user;
    var route = {};
    $scope.go = function(state) {
        $state.go(state);
    };
    $scope.numberofroutes = 5;
    $scope.selectedIndex = 0;
    //$scope.myview = 'viewB';

    $scope.onSwipeRight = function (){

        if ($scope.selectedIndex < 2){
            $scope.selectedIndex  = $scope.selectedIndex + 1;
        }
        // if you want to make all the tour
        else{
            $scope.selectedIndex  = 0;
        }
    }

    $scope.onSwipeLeft = function () {

        if ($scope.selectedIndex > 0){
            $scope.selectedIndex  = $scope.selectedIndex - 1;
        }
        // if you want to make all the tour
        else {
            $scope.selectedIndex  = 2;
        }
    }
    $scope.$watch('selectedIndex', function(current, old) {
        switch (current) {
            case 0:
                //$location.url("/seeall");
                $scope.go('info.seeAll');
                break;
            case 1:
                //$location.url("/addroute");
                $scope.go('info.addRoute');
                break;
            case 2:
                //$location.url("/searchroute");
                $scope.go('info.searchRoute');
                break;
        }
    });

    //$scope.seeAllRoutes = function () {
    Routes.retrieveRoutes().then(function (data) {
        //console.log(data);
        $scope.routes = data;
        /*data.forEach(function (d) {
         $scope.addMarker(new google.maps.LatLng(d.srcloc.coordinates[1], d.srcloc.coordinates[0]), d.username);
         $scope.addMarker(new google.maps.LatLng(d.dstloc.coordinates[1], d.dstloc.coordinates[0]), d.username);
         });*/
    }, function (err) {
        console.log('error here....', err);
    });
    //};

    $scope.rowCollection = [].concat($scope.routes);


    $scope.addRoute = function () {
        route.uuid = Routes.uuid();
        route.username = $scope.name;
        route.srcAddr = $scope.addressSrc;
        route.dstAddr = $scope.addressDst;
        var directionsDisplay;
        $q.all([Routes.getGeocodes({'address' : $scope.addressSrc}),Routes.getGeocodes({'address': $scope.addressDst})]).then(function(results){
            route.srcloc = {type: 'Point', coordinates: [results[0][0].geometry.location.F, results[0][0].geometry.location.A]};
            route.dstloc = {type: 'Point', coordinates: [results[1][0].geometry.location.F, results[1][0].geometry.location.A]};
            //console.log(route);
            Routes.saveRoute(route).success(function () {
                console.log('Route added');
                $scope.addressSrc = '';
                $scope.addressDst = '';
                //$scope.addMarker(new google.maps.LatLng(results[0][0].geometry.location.A,results[0][0].geometry.location.F),$scope.name);
                //$scope.addMarker(new google.maps.LatLng(results[1][0].geometry.location.A,results[1][0].geometry.location.F),$scope.name);
                Routes.getDirections((new google.maps.LatLng(results[0][0].geometry.location.A,results[0][0].geometry.location.F)),(new google.maps.LatLng(results[1][0].geometry.location.A,results[1][0].geometry.location.F)))
                    .then(function (data) {
                        directionsDisplay = new google.maps.DirectionsRenderer();
                        directionsDisplay.setDirections(data);
                        directionsDisplay.setMap($scope.myMap);
                    });
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
                markers = clearMarkers(markers);
                $scope.searchedRoutes = $filter('matchRoutes')(data,$scope.dstlatlng);
                $scope.addMarker(new google.maps.LatLng($scope.dstlatlng[1],$scope.dstlatlng[0]),$scope.name,2);
                $scope.addMarker(new google.maps.LatLng(srclatlng[1],srclatlng[0]),$scope.name,1);
                $scope.searchedRoutes.forEach(function (r) {
                    //console.log(r);
                    $scope.addMarker(new google.maps.LatLng(r.srcloc.coordinates[1], r.srcloc.coordinates[0]), r.username);
                    $scope.addMarker(new google.maps.LatLng(r.dstloc.coordinates[1], r.dstloc.coordinates[0]), r.username);
                });
                //$scope.searchedRoutes = data;
            }, function (err) {
                console.log('error here....', err);
            });
        });
    };

    //Google map code....
    $scope.mapOptions = {
        center: new google.maps.LatLng(37.3382, -121.670),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var markers = [];
    $scope.addMarker = function (pos, name, icon) {
        var iconUrl;
        switch(icon) {
            case 1:
                iconUrl ='http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                break;
            case 2:
                iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                break;
            default:
                iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                break;
        }
        var marker = new google.maps.Marker({
            position: pos,
            map: $scope.myMap,
            title: name,
            icon: iconUrl
        });
        markers.push(marker);
    };

    function clearMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
        return markers;
    }



}).filter('matchRoutes', function() {
    return function(route, dstlatlng) {
        route = route || {};
        var output = [];
        if(route.length !== 0 && dstlatlng !== undefined) {
            for (var prop in route) {
                if(route[prop].dstloc.coordinates[0] === dstlatlng[0] && route[prop].dstloc.coordinates[1] === dstlatlng[1]) {
                    //console.log('route', route);
                    output.push(route[prop]);
                }
            }
        }
        return output;
    };
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
        getDirections: function (srcLatlng, dstLatlng) {
            return $q(function (resolve, reject) {
                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: srcLatlng,
                    destination: dstLatlng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        //directionsDisplay.setDirections(response);
                        resolve(response);
                    }else {
                        reject(response);
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