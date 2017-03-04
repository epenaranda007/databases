var models = require('../models');
var http = require('http');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(dbData) {
        sendResponse(res, JSON.stringify(dbData));
      });
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      models.messages.post(req.body, function(dbData) {
        sendResponse(res, dbData);
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(dbData) {
        sendResponse(res, JSON.stringify(dbData));
      });
    },

    post: function (req, res) {
      models.users.post(req.body, function(dbData) {
        sendResponse(res, dbData);
      });
    }

  }
};


