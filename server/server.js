var port = process.env.PORT || 3000;
var express = require('express');
var session = require('express-session');
var util = require('./config/utils.js');
var mongoose = require('mongoose');
var handler = require('./config/request-handler.js');
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var apiRoutes = require('./controllers');
var morgan = require('morgan');
var secrets = require('./config/secrets.js')

var app = express();


  // Express 4 allows us to use multiple routers with their own configurations
  //var questionsRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));
  app.use(morgan('dev'));

  //app.use('/api/profiles', questionsRouter); // use questions router for all questions request


  // inject our routers into their respective route files
  // require('./config/request-handler.js')(questionsRouter);


// github auth
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
    clientID: secrets.GITHUB_CLIENT_ID,
    clientSecret: secrets.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));


// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://localhost/hralumnimark2");

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
    scope: ['user', 'user:email', 'read:org']
  }),
  function(req, res) {

  });

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }), function(req, res) {
    //console.log('req',req.user);
    var data= {
      body: req.user,
      fromGitHub: true
    };
    handler.createProfile(data, res);
    // res.redirect('/');
  });

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api/profiles', handler.findAll);
app.post('/api/profiles', handler.createProfile);
app.get('/api/profile/:githubName', handler.findOne);
app.post('/api/updateProfile', handler.updateProfile);

app.use('/api/board', apiRoutes);

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
