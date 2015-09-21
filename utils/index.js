var db = require('../db');

// returns all predictions
exports.sendAllPredictions = function(callback) {
  db.Predictions.findAll().then(callback);
};

// fetches all prediction from db
exports.addPrediction = function(data, callback) {
  db.Predictions.create({
    entity: data.entity,
    description: data.description,
    date: data.date,
    link: data.link,
    status: 'pending' 
  }).then(callback);
};

// updates prediction status
exports.updatePredictionStatus = function(data, callback) {
  db.Predictions.findById(data.id).then(
    function(prediction) {
      console.log(prediction);
      prediction.updateAttributes({
      status: data.status
      });
    }).then(callback);
};
