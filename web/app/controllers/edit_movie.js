movieApp.controller('EditMovieCtrl', function ($scope, $routeParams, FirebaseService, currentAuth, $location) {
  if (!currentAuth) {
    $location.path('/login');
  }

  $scope.movies = FirebaseService.getMovies();

  FirebaseService.getMovie($routeParams.key, function (movie) {
    $scope.record = movie;
    $scope.movie = angular.copy(movie);
  });

  $scope.updateMovie = function () {
    if (FirebaseService.isValid($scope.movie)) {
      $scope.record.title = $scope.movie.title;
      $scope.record.year = $scope.movie.year;
      $scope.record.director = $scope.movie.director;
      $scope.record.description = $scope.movie.description;

      FirebaseService.updateMovie($scope.record);
    }
  };
});
