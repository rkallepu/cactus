app.controller('mainController', function($scope, Routes){
    //console.log('Inside Main controller');
    $scope.show = {};
    $scope.update = function(logout, login, register){
        $scope.show.Logout = logout;
        $scope.show.Login = login;
        $scope.show.Register = register;
    };
    $scope.update(true, false, false);
    $scope.logout = function(){
        //console.log('you clicked on logout');
        Routes.logout().success(function () {
            console.log('Logged out successfully..');
        }).error(function (err) {
            console.log('error on logout..',err);
        });
        $scope.update(true, false, false);
    };
});

function onGoogleReady() {
    console.log('Google maps api initialized.');
    angular.bootstrap(document, ['rideshareApp']);
}