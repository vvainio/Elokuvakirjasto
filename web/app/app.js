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
    .otherwise({
      redirectTo: '/movies'
    });
});
