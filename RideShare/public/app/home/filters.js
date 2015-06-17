angular.module('homeFilter', []).filter('matchRoutes', function() {
    return function(route, searchDestLon, searchDestLat) {
        route = route || {};
        var output = [];
        //console.log('Hi from filter',route);
        if(route.length !== 0) {
            for (var prop in route) {
                if (route[prop].dstloc.coordinates[0] === Number(searchDestLon) && route[prop].dstloc.coordinates[1] === Number(searchDestLat)) {
                    //console.log('route', route);
                    output.push(route[prop]);
                }
            }
        }
        //console.log('route before returning',output);
        return output;
    };
});
