var movieApp = angular.module("movieApp", ["ngRoute", "firebase"]);

movieApp.config(function ($routeProvider) {
  $routeProvider
    .when('/movies', {
      controller: 'MovieListCtrl',
      templateUrl: 'app/views/movie_list.html'
    })
    .when('/movies/new', {
      controller: 'AddMovieCtrl',
      templateUrl: 'app/views/add_movie.html'
    })
    .when('/movies/:key', {
      controller: 'ShowMovieCtrl',
      templateUrl: 'app/views/show_movie.html'
    })
    .when('/movies/:key/edit', {
      controller: 'EditMovieCtrl',
      templateUrl: 'app/views/edit_movie.html'
    })
    .otherwise({
      redirectTo: '/movies'
    });
});

movieApp.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
});
