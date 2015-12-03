describe('Show movie', function(){
  var controller, scope;

  var FirebaseServiceMock, RouteParamsMock;

  beforeEach(function(){
    module('movieApp');

    FirebaseServiceMock = (function(){
      var movie = {
        title: 'The Matrix',
        year: 1999,
        director: 'The Wachowski Brothers',
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
      };

      return {
        getMovie: function (key, done) {
          return (key === 'foo') ? done(movie) : done(null);
        }
      };
    })();

    RouteParamsMock = (function(){
      return {
        key: 'foo'
      };
    });

    spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('ShowMovieCtrl', {
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
  * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  * käyttämällä toBeCalled-oletusta.
  */
  it('should show current movie from Firebase', function(){
    expect(RouteParamsMock().key).toBe('foo');
    expect(scope.movie.title).toBe('The Matrix');
    expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
  });
});
