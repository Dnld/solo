var express = require('express');
var bodyParser = require('body-parser');
var utils = require('./utils');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// api to serve all predictions to client
app.get('/api/all-predictions', function(req, res) {
  utils.sendAllPredictions(function(results) {
    res.json(results);
  });
});

// api to post predictions
app.post('/api/predictions', function(req, res) {  
  utils.addPrediction(req.body, function() {
    res.sendStatus(200);
  });
});


// api to update prediction status
app.post('/api/prediction-status', function(req, res) {
  utils.updatePredictionStatus(req.body, function() {
    res.sendStatus(200);
  });
});

// serves static dependencies
app.use(express.static(__dirname + "/client"));

module.exports = app;
