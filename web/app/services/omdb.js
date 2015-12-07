movieApp.service('omdbService', function ($http) {
  this.findMovie = function (search) {
    return $http.get('https://www.omdbapi.com', {
      params: {
        s: search.name,
        y: search.year
      }
    });
  };
});
