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

// main page get request handler
app.get('/', utils.checkUser, function(req, res) {
  res.redirect('/index.html');
});

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
app.get('/api/all-predictions', utils.checkUser, function(req, res) {
  var user = req.session.user;
  utils.sendAllPredictions(user, function(results) {
    res.json(results);
  });
});

// api to post predictions
app.post('/api/predictions', utils.checkUser, function(req, res) {  
  var user = req.session.user;
  utils.addPrediction(req.body, user, function() {
    res.sendStatus(200);
  });
});

// api to update prediction status
app.post('/api/prediction-status', utils.checkUser, function(req, res) {
  utils.updatePredictionStatus(req.body, function() {
    res.sendStatus(200);
  });
});

// serves static dependencies
app.use(express.static(__dirname + "/client"));

// checks every 3 seconds if a follow up email is needed
setInterval(utils.checkForFollowUp, 3000);

module.exports = app;
