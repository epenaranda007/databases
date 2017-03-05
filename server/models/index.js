var db = require('../db');

// db returns mysql connection
// all models should return a return a response
// this module is exported to controllers
module.exports = {
  messages: {
    get: function (callback) {
      // must structure query to only return user/user.ids that correspond to the messages
      var queryString = 'select messages.id, messages.message, users.username, rooms.roomname\
                        from messages inner join users inner join rooms on (messages.username_id = users.id AND \
                        messages.roomname_id = rooms.id)\
                        ';
      var query = db.query(queryString, function (err, results) {
        if (err) {
          console.log(err);
        }
        callback(results);
      });
    }, // a function which produces all the messages

    post: function (message, callback) {
      var params = [message.message, message.username, message.roomname];
      var queryString = 'INSERT into messages(message, username_id, roomname_id)\
                        VALUES (?,(select id from users where username = ? LIMIT 1), \
                        (select id from rooms where roomname = ? LIMIT 1))\
                        ';
      var query = db.query(queryString, params, function (err, results) {
        callback(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {  
      db.query('SELECT * FROM messages', function (err, results) {
        callback(results);
      });
    },
    post: function (username, callback) {
      db.query('INSERT INTO users SET ?', username, function (err, results) {
        callback(results);
      });
    }
  },

  rooms: {
    get: function (callback) {  
      db.query('SELECT * FROM rooms', function (err, results) {
        callback(results);
      });
    },
    post: function (roomname, callback) {
      db.query('INSERT INTO rooms SET ?', roomname, function (err, results) {
        callback(results);
      });
    }
  }
};

