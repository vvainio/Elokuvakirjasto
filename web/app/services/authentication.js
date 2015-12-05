movieApp.service('AuthenticationService', function ($firebaseAuth) {
  var firebaseRef = new Firebase('https://luminous-heat-2991.firebaseio.com/movies');
  var firebaseAuth = $firebaseAuth(firebaseRef);

  this.isLoggedIn = function () {
    return firebaseAuth.$waitForAuth();
  };

  this.currentUser = function () {
    return firebaseAuth.$getAuth();
  };

  this.createUser = function (email, password) {
    return firebaseAuth.$createUser({
      email: email,
      password: password
    });
  };

  this.logIn = function (email, password) {
    return firebaseAuth.$authWithPassword({
      email: email,
      password: password
    });
  };

  this.logOut = function () {
    firebaseAuth.$unauth();
  };
});
