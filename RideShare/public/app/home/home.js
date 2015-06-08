angular.module('rideshareApp.home', []).controller('homeCont', function($scope, $location,Account){
    console.log('Inside home controller');
    $scope.name = Account.user.user.name;
});
