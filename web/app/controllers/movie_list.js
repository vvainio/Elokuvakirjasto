movieApp.controller('MovieListCtrl', function ($scope, FirebaseService) {
  $scope.movies = FirebaseService.getMovies();

  $scope.deleteMovie = function (movie) {
    FirebaseService.deleteMovie(movie);
  };
});
