app.controller('mainController', function($scope){
    console.log('Inside Main controller');
    $scope.show = {};
    $scope.update = function(logout, login, register){
        $scope.show.Logout = logout;
        $scope.show.Login = login;
        $scope.show.Register = register;
    };
    $scope.update(true, false, false);
});
