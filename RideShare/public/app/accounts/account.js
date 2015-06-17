angular.module('rideshareApp.accounts', []).controller('registerCont', function($scope, $location, Account){
    console.log('Inside register controller');
    $scope.update(true, false, true);
    $scope.new_user = { };
    $scope.register = function(){
        Account.register($scope.new_user).success(function (data){
            console.log('Hi from register controller');
            $location.path('/login');
        });
    }
}).controller('loginCont', function($scope, $location, Account){
    $scope.update(true, true, false);
    $scope.new_user = {};
    console.log('Inside login controller');
    $scope.login = function(){
        Account.login($scope.new_user).then(function(data){
            console.log('Hi from login controller');
            $location.path('/info');
        });
    };
}).service('Account', function($q,$http){
    var _user =null;
    return {
      register: function(user){
          return $http.post('/register', user);
      },
      login: function (user) {
          return $q(function (resolve, reject) {
              $http.post('/login', user).success(function (data) {
                  _user = data;
                  resolve(data);
              }).error(function (data) {
                  reject(data);
              });
          });
      },
        get user (){
            return _user;
        }
    };
});


