var Sequelize = require('sequelize');

// database for local development
var sequelize = new Sequelize('predictster', 'root', '');

// database for deployment
// var sequelize = new Sequelize('heroku_1d53ef85d78ea23', 
//   'bfe4707de06a77', '7adf373c', {
//   host: 'us-cdbr-iron-east-02.cleardb.net',
// });

exports.Predictions = Predictions = sequelize.define('Predictions', {
  entity: Sequelize.STRING,
  description: Sequelize.TEXT('medium'),
  date: Sequelize.STRING,
  link: Sequelize.STRING,
  status: Sequelize.STRING,
});

exports.Users = Users = sequelize.define('Users', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

Predictions.sync();
Users.sync();
