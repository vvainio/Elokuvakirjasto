movieApp.controller('AddMovieCtrl', function ($scope, FirebaseService, currentAuth, $location) {
  if (!currentAuth) {
    $location.path('/login');
  }

  $scope.movies = FirebaseService.getMovies();
  $scope.movie = {};

  $scope.addMovie = function () {
    if (FirebaseService.isValid($scope.movie)) {
      FirebaseService.addMovie($scope.movie);
    }
  };
});
