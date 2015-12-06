var movieApp = angular.module("movieApp", ["ngRoute", "firebase"]);

movieApp.config(function ($routeProvider) {
  $routeProvider
    .when('/login', {
      controller: 'UserCtrl',
      templateUrl: 'app/views/user_form.html',
      resolve: {
        currentAuth: function (AuthenticationService) {
          return AuthenticationService.currentUser();
        }
      }
    })
    .when('/movies', {
      controller: 'MovieListCtrl',
      templateUrl: 'app/views/movie_list.html'
    })
    .when('/movies/new', {
      controller: 'AddMovieCtrl',
      templateUrl: 'app/views/add_movie.html',
      resolve: {
        currentAuth: function (AuthenticationService) {
          return AuthenticationService.currentUser();
        }
      }
    })
    .when('/movies/:key', {
      controller: 'ShowMovieCtrl',
      templateUrl: 'app/views/show_movie.html'
    })
    .when('/movies/:key/edit', {
      controller: 'EditMovieCtrl',
      templateUrl: 'app/views/edit_movie.html',
      resolve: {
        currentAuth: function (AuthenticationService) {
          return AuthenticationService.currentUser();
        }
      }
    })
    .otherwise({
      redirectTo: '/movies'
    });
});

movieApp.config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
});

movieApp.run(function (AuthenticationService, $rootScope, $location) {
  $rootScope.logIn = function () {
    $location.path('/login');
  };

  $rootScope.logOut = function() {
    AuthenticationService.logOut();
    delete $rootScope.isLoggedIn;
  };

  $rootScope.isLoggedIn = AuthenticationService.currentUser();
});
