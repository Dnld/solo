var db = require('../db');

// adds user to database
exports.addUser = function(data, callback) {
  db.Users.create({
    email: data.email,
    password: data.password
  }).then(callback);
};

// checks if user is in database
exports.validateUser = function(data, callback) {
  db.Users.find({where: {email: data.email}}).then(
    function(user) {
      if (!user) {
        console.log('user not found');
      } if (user) {
        console.log('user found');
        if (data.password === user.password) {
          callback();
        } else {
          console.log('invalid password');
        }
      }
    });
};

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
