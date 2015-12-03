describe('Edit movie', function(){
  var controller, scope;

  var FirebaseServiceMock, RouteParamsMock;

  beforeEach(function(){
    module('movieApp');

    FirebaseServiceMock = (function(){
      var movies = [
        {
          title: 'The Matrix',
          year: 1999,
          director: 'The Wachowski Brothers',
          description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
        },
        {
          title: 'The Shining',
          year: 1980,
          director: 'Stanley Kubrick',
          description: 'A family heads to an isolated hotel for the winter where an evil and spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.'
        }
      ];

      return {
        getMovies: function () {
          return movies;
        },

        getMovie: function (key, done) {
          return (key === 'foo') ? done(movies[0]) : done(null);
        },

        updateMovie: function (movie) {
          movies[0] = movie;
        },

        isValid: function (movie) {
          return movie.title && movie.year && movie.director && movie.description;
        }
      };
    })();

    RouteParamsMock = (function(){
      return {
        key: 'foo'
      };
    });

    spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
    spyOn(FirebaseServiceMock, 'updateMovie').and.callThrough();

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('EditMovieCtrl', {
        $scope: scope,
        FirebaseService: FirebaseServiceMock,
        $routeParams: RouteParamsMock()
      });
    });
  });

  /*
  * Testaa alla esitettyjä toimintoja kontrollerissasi
  */

  /*
  * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  * käyttämällä toBeCalled-oletusta.
  */
  it('should fill the edit form with the current information about the movie', function(){
    expect(scope.record.title).toBe('The Matrix');
    expect(scope.movie.title).toBe('The Matrix');
    expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    expect(FirebaseServiceMock.updateMovie).not.toHaveBeenCalled();
  });

  /*
  * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
  * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  * käyttämällä toBeCalled-oletusta.
  */
  it('should be able to edit a movie by its name, director, release date and description', function(){
    expect(scope.record.title).toBe('The Matrix');
    expect(scope.movie.title).toBe('The Matrix');
    scope.movie.title = 'Foobar';
    scope.updateMovie();
    expect(scope.record.title).toBe('Foobar');
    expect(FirebaseServiceMock.updateMovie).toHaveBeenCalled();
  });

  /*
  * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
  * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  * käyttämällä not.toBeCalled-oletusta.
  */
  it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
    expect(scope.record.title).toBe('The Matrix');
    expect(scope.movie.title).toBe('The Matrix');
    scope.movie.title = '';
    scope.updateMovie();
    expect(scope.record.title).toBe('The Matrix');
    expect(FirebaseServiceMock.updateMovie).not.toHaveBeenCalled();
  });
});
