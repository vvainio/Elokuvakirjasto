describe('Add movie', function(){
  var controller, scope;

  var FirebaseServiceMock;

  beforeEach(function(){
    module('movieApp');

    FirebaseServiceMock = (function(){
      var movies = [];

      return {
        getMovies: function () {
          return movies;
        },

        addMovie: function (movie) {
          movies.push(movie);
        }
      };
    })();

    spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
    spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('AddMovieCtrl', {
        $scope: scope,
        FirebaseService: FirebaseServiceMock
      });
    });
  });

  /*
  * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  * toBeCalled-oletusta.
  */
  it('should be able to add a movie by its name, director, release date and description', function(){
    scope.movie = {
      title: 'Inception',
      year: 2010,
      director: 'Christopher Nolan',
      description: 'A thief who steals corporate secrets through use of the dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
    };

    expect(scope.movies.length).toBe(0);
    scope.addMovie();
    expect(scope.movies.length).toBe(1);
    expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
  });

  /*
  * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
  * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
  * not.toBeCalled-oletusta (muista not-negaatio!).
  */
  it('should not be able to add a movie if its name, director, release date or description is empty', function(){
    scope.movie = {
      title: 'Inception',
      year: 2010,
      director: 'Christopher Nolan',
      description: ''
    };

    expect(scope.movies.length).toBe(0);
    scope.addMovie();
    expect(scope.movies.length).toBe(0);
    expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
  });
});
