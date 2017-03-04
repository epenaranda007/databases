var db = require('../db');

// db returns mysql connection
// all models should return a return a response
// this module is exported to controllers
module.exports = {
  messages: {
    get: function (callback) {
      db.connect();
      // TODO: change the query later
      db.query('SELECT * FROM messages', function (err, rows, fields) {
      //rows is an array
        callback(rows);
      });
      db.end();
    }, // a function which produces all the messages
    post: function (parsedData, callback) {
      var username = parsedData.username;
      var roomname = parsedData.roomname;
      var message = parsedData.message;
      db.connect();
      // 'INSERT INTO employees SET ?', employee object
      db.query('INSERT into messages (username, message, roomname) VALUES(' + username + ', ' + message + ', ' + roomname + ')', function (err, rows, fields) {
      //rows is an array
        callback(rows);
      });
      db.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.connect();

      db.end();
    },
    post: function (parsedUsername, callback) {
      var username = parsedUsername.username;
      db.connect();
      db.query('INSERT INTO users (username) VALUES(' + username + ')', function (err, rows, fields) {
        callback(rows);
      });
      db.end();
    }
  }
};

