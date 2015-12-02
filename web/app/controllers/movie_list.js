movieApp.controller('MovieListCtrl', function ($scope, FirebaseService) {
  $scope.movies = FirebaseService.getMovies();
});
