describe('Movie list', function(){
  var controller, scope;

  var FirebaseServiceMock;

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
        }
      };
    })();

    spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('MovieListCtrl', {
        $scope: scope,
        FirebaseService: FirebaseServiceMock
      });
    });
  });

  /*
  * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät kontrollerista
  * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  * käyttämällä toBeCalled-oletusta.
  */
  it('should list all movies from the Firebase', function(){
    expect(scope.movies.length).toBe(2);
    expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
  });

  /*
  * Testaa, että elokuvan pystyy poistamaan Firebasesta.
  * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  * käyttämällä toBeCalled-oletusta.
  */
  it('should be able to remove a movie', function(){
    expect(true).toBe(false);
  });
});
