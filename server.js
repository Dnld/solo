var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('./utils');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

var checkUser = function(req, res, next) {
  if (!req.session.loggedIn) {    
  } else {
    next();
  }
};

// sign up
app.post('/api/sign-up', function(req, res) {
  utils.addUser(req.body, function() {
    console.log('added');
    req.session.loggedIn = true;
    req.session.user = req.body.email;
    res.sendStatus(200);
  });
});

// sign in
app.post('/api/sign-in', function(req, res) {
  utils.validateUser(req.body, function() {
    console.log('validated');
    req.session.loggedIn = true;
    req.session.user = req.body.email;
    res.sendStatus(200);
  });
});

// api to serve all predictions to client
app.get('/api/all-predictions', checkUser, function(req, res) {
  utils.sendAllPredictions(function(results) {
    console.log(req.session.user);
    res.json(results);
  });
});

// api to post predictions
app.post('/api/predictions', checkUser, function(req, res) {  
  utils.addPrediction(req.body, function() {
    res.sendStatus(200);
  });
});

// api to update prediction status
app.post('/api/prediction-status', checkUser, function(req, res) {
  utils.updatePredictionStatus(req.body, function() {
    res.sendStatus(200);
  });
});

// serves static dependencies
app.use(express.static(__dirname + "/client"));

module.exports = app;
