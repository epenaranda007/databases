var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(dbData) {
        res.json(dbData);
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      models.messages.post(req.body, function(dbData) {
        res.sendStatus(201);
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(dbData) {
        res.json(dbData);
      });
    },

    post: function (req, res) {
      models.users.post(req.body, function(dbData) {
        res.sendStatus(201);
      });
    }
  },
  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get(function(dbData) {
        res.json(dbData);
      });
    },

    post: function (req, res) {
      models.rooms.post(req.body, function(dbData) {
        res.sendStatus(201);
      });
    }
  }

};


