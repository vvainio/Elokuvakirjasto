movieApp.controller('AddMovieCtrl', function ($scope, FirebaseService) {
  $scope.movies = FirebaseService.getMovies();
  $scope.movie = {};

  $scope.addMovie = function () {
    if (FirebaseService.isValid($scope.movie)) {
      FirebaseService.addMovie($scope.movie);
    }
  };
});
