movieApp.controller('MovieListCtrl', function ($rootScope, $scope, FirebaseService, omdbService) {
  $scope.movies = FirebaseService.getMovies();

  $scope.deleteMovie = function (movie) {
    FirebaseService.deleteMovie(movie);
  };

  $scope.findMovie = function () {
    omdbService.findMovie($scope.search).success(function (response) {
      var results = response.Search;
      $scope.searchResults = results ? results : [];
    });
  };
});
