var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// api to post predictions
app.post('/api/predictions', function(req, res) {
  console.log(req.body);
  
  db.Predictions.create({
    entity: req.body.entity,
    description: req.body.description,
    date: req.body.date,
    link: req.body.link,
    status: 'pending' 
  });
  
});

// serves static dependencies
app.use(express.static(__dirname + "/client"));

module.exports = app;
