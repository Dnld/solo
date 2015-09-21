var Sequelize = require('sequelize');

var sequelize = new Sequelize('predictster', 'root', '');

exports.Predictions = Predictions = sequelize.define('Predictions', {
  entity: Sequelize.STRING,
  description: Sequelize.TEXT('medium'),
  date: Sequelize.STRING,
  link: Sequelize.STRING,
  status: Sequelize.STRING,
});

Predictions.sync();
