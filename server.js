var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// api to post predictions
app.post('/api/predictions', function(req, res) {
  console.log(req.body);
});

// serves static dependencies
app.use(express.static(__dirname + "/client"));

module.exports = app;
