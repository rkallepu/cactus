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
        Routes.logout();
        $scope.update(true, false, false);
    };
});
