/*
angular.module('homeFilter', []).filter('matchRoutes', function() {
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
        //console.log('Hi from filter',route);
        //console.log('route before returning',output);
        return output;
    };
});
*/
