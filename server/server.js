var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var util = require('./config/utils.js');

// github auth
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = '399d03e217b75d4f4625';
var GITHUB_CLIENT_SECRET = '8e4dcd1a7c66f1db0c438aa50aa3c4af8aa4d2d5';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));


mongoose.connect('mongodb://localhost/hralumni');

app.use(express.static(__dirname + '/../client'));

app.use(session({
  secret: 'lambo',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', {
    scope: ['user:email']
  }),
  function(req, res) {

  });

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Server started on port: ' + port);
});