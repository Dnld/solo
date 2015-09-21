var db = require('../db');

// adds prediction to db
exports.addPrediction = function(data, callback) {
  db.Predictions.create({
    entity: data.entity,
    description: data.description,
    date: data.date,
    link: data.link,
    status: 'pending' 
  }).then(callback);
};

// returns all predictions
exports.sendAllPredictions = function(callback) {
  db.Predictions.findAll().then(callback);
};
