var db = require('../db');

// db returns mysql connection
// all models should return a return a response
// this module is exported to controllers
module.exports = {
  messages: {
    get: function (callback) {
      // TODO: change the query later
      db.query('SELECT * FROM messages', function (err, rows, fields) {
      //rows is an array
        callback(rows);
      });
    }, // a function which produces all the messages

    post: function (message, callback) {
      console.log(message)
      console.log('we are in post messages');
      // db.connect();
      // message.message = JSON.stringify(message.message);
      var query = db.query('INSERT INTO messages SET ?', message, function (err, rows, fields) {
        console.log('we are in the query', err);
        callback(fields);
      });
      console.log(query.sql);
      // db.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      // db.connect();

      // db.end();
    },
    post: function (username, callback) {
      console.log('we are in post users');
      console.log(username);
      // db.connect();
      db.query('INSERT INTO users SET ?', username, function (err, rows, fields) {
        callback(fields);
      });
      // db.end();
    }
  }
};

