var Sequelize = require('sequelize');

// database for local development
// var sequelize = new Sequelize('predictster', 'root', '');

// database for deployment
var sequelize = new Sequelize('heroku_798062d2c0ae3e4', 
  'b7577fb0d7b6e0:9d91143f', '', {
  host: 'us-cdbr-iron-east-02.cleardb.net',
});

exports.Predictions = Predictions = sequelize.define('Predictions', {
  entity: Sequelize.STRING,
  description: Sequelize.TEXT('medium'),
  date: Sequelize.STRING,
  link: Sequelize.STRING,
  status: Sequelize.STRING,
});

Predictions.sync();
