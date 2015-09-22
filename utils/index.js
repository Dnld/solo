var db = require('../db');
var nodemailer = require('nodemailer');

// checks if user is logged in
exports.checkUser = function(req, res, next) {
  if (!req.session.loggedIn) {
    res.redirect('/signin.html');    
  } else {
    next();
  }
};

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
exports.sendAllPredictions = function(user, callback) {
  db.Predictions.findAll({where:
    {user: user}  
  }).then(callback);
};

// fetches all prediction from db
exports.addPrediction = function(data, user, callback) {
  db.Predictions.create({
    user: user,
    entity: data.entity,
    entity_contact: data.entityContact,
    description: data.description,
    date: data.date,
    link: data.link,
    status: 'pending',
    followup_email: 0
  }).then(
    function() {
      if (data.entityContact) {
        sendNotificationEmail(data.entityContact, data.description);
      }
    }
  ).then(callback);
};

// updates prediction status
exports.updatePredictionStatus = function(data, callback) {
  db.Predictions.findById(data.id).then(
    function(prediction) {
      prediction.updateAttributes({
      status: data.status
      });
    }
  ).then(callback);
};

// updates follow-up status
var updateFollowUpStatus = function(id) {
  db.Predictions.findById(id).then(
    function(prediction) {
      prediction.updateAttributes({
      followup_email: 1
      });
    }
  );
};

// creates mail transport and model emails
var mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'predictsterfollowup@gmail.com',
    pass: 'thisisapassword'
  }
});

// follow-up email template
var sendFollowUpEmail = function(user, callback) {
  mailTransport.sendMail({
    from: '"Predictster" <predictsterfollowup@gmail.com>',
    to: user,
    subject: 'Remember to Follow-Up on the Prediction You Posted on Predictster',
    text: 'One of the predictions you posted to Predictster is coming due today.  Head over to Predictster and update its status.'
  }, function(err) {
    if (err) {
      console.log('error sending email');
      return;
    }
    console.log('follow up email sent');
    callback();
  });
};

// notification email template
var sendNotificationEmail = function(contact, prediction) {
  mailTransport.sendMail({
    from: '"Predictster" <predictsterfollowup@gmail.com>',
    to: contact,
    subject: 'Your prediction is being tracked on Predictster',
    text: 'You made the following prediction that is now being tracked on Predictster: ' + prediction
  }, function(err) {
    if (err) {
      console.log('error sending email');
      return;
    }
    console.log('notification email sent');
  });
};

// checks to send followup email
exports.checkForFollowUp = function(user) {
  console.log('checking for follow ups');
  db.Predictions.findAll().then(function(results) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + 
      today.getDate();
    for (var i = 0; i < results.length; i++) {
      var predictionId = results[i].dataValues.id;
      var user = results[i].dataValues.user;
      var dueDate = results[i].dataValues.date;
      var status = results[i].dataValues.status;
      var followUpStatus = results[i].dataValues.followup_email;
      if (dueDate <= date && status === 'pending' && followUpStatus === 0) {
        sendFollowUpEmail(user, function() {
          updateFollowUpStatus(predictionId);
        });
      }
    }
  });
};
