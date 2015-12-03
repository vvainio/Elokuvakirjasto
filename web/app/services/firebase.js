movieApp.service('FirebaseService', function ($firebaseArray) {
  var firebaseRef = new Firebase('https://luminous-heat-2991.firebaseio.com/movies');
  var movies = $firebaseArray(firebaseRef);

  this.getMovies = function () {
    return movies;
  };

  this.getMovie = function (key, done) {
    movies.$loaded(function () {
      done(movies.$getRecord(key));
    });
  };

  this.addMovie = function (movie) {
    movies.$add(movie);
  };

  this.updateMovie = function (movie) {
    movies.$save(movie);
  };

  this.deleteMovie = function (movie) {
    movies.$remove(movie);
  };

  this.isValid = function (movie) {
    return movie.title && movie.year && movie.director && movie.description;
  };
});
