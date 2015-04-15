var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
  var User = require('../db/users.js');

  User.findOne({accessToken: accessToken}, function (error, user) {
    if (error) {
      return done(error);
    }

    if (user) {
      console.log('found a user:', profile.username);
      done(null, user);
    } else {
      var newUser = new User({accessToken: accessToken, refreshToken: refreshToken, profile: profile});
      newUser.save(function (error, user) {
        if (error) {
          return done(error);
        }
        console.log('saved new user:', profile.username);
        return done(null, user);
      });
    }
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = {
  session: function (app) {
    app.use(require('express-session')({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
  },
  authenticateWithGitHub: passport.authenticate('github')
};
