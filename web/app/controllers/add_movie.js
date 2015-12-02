movieApp.controller('AddMovieCtrl', function ($scope, FirebaseService) {
  $scope.movies = FirebaseService.getMovies();
  $scope.movie = {};

  $scope.addMovie = function () {
    if (isValid()) {
      FirebaseService.addMovie($scope.movie);
    }
  };

  function isValid() {
    return $scope.movie.title &&
           $scope.movie.year &&
           $scope.movie.director &&
           $scope.movie.description;
  }
});
