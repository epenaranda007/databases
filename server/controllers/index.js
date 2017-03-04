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

var collectData = function(request, callback) {
  console.log('we are in collect');
  var body = '';
  callback(request.body);
  // request.on('data', function (chunk) {
  //   body += chunk;
  // });
  // request.on('end', function() {
  //   console.log("at the end")
  //   callback(JSON.parse(body));
  // });
};

module.exports = {
  messages: {
    get: function (req, res) {
      sendResponse(res, models.messages.get(function(dbData) {
        return dbData;
      }));
    }, // a function which handles a get request for all messages

    post: function (req, res) {
      // var reqData = collectData(req, function(data) {
      //   console.log(data)
      //   return data;
      // });
      // models.messages.post(reqData, function(dbData) {
      //   sendResponse(res, dbData);
      // });

      collectData(req, function(reqData) {
        models.messages.post(reqData, function(dbData) {
          sendResponse(res, dbData);
        });
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      sendResponse(res, models.users.get(function(data) {
        return data;
      }) );
    },

    post: function (req, res) {
      collectData(req, function(reqData) {
        models.users.post(reqData, function(dbData) {
          sendResponse(res, dbData);
        });
      });

    }

  }
};


