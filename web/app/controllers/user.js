movieApp.controller('UserCtrl', function ($rootScope, $scope, $location, AuthenticationService, currentAuth, $location) {
  if (currentAuth) {
    $location.path('/movies');
  }

  $scope.logIn = function () {
    AuthenticationService.logIn($scope.email, $scope.password)
    .then(function () {
      $location.path('/movies');
      $rootScope.isLoggedIn = AuthenticationService.currentUser();
    })
    .catch(function () {
      $scope.message = 'Väärä sähköpostiosoite tai salasana!';
    });
  };

  $scope.register = function () {
    AuthenticationService.createUser($scope.email, $scope.password)
    .then(function () {
      AuthenticationService.logIn($scope.email, $scope.password)
      .then(function () {
        $location.path('/movies');
      });
    })
    .catch(function () {
      $scope.message = 'Tapahtui virhe! Yritä uudelleen.';
    });
  };
});
