var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, url, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  //assest = file. index. css. images. 
  //response: 
  console.log('in serve assets');
  fs.readFile(__dirname + '/archives/sites' + url, function(err, contents) {
    console.log('in filesreadfile');
    if (err) {
      console.log(err);
    } else {
      console.log('filepath ', url);
      httpHelpers.sendResponse(res, contents, 'text/html');
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!

exports.sendResponse = function(response, data, contentType, statusCode) {
  statusCode = statusCode || 200;
  headers['Content-Type'] = contentType;
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.makeActionHandler = function(actionMap) {
  return function(request, response) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      exports.sendResponse(response, '', 404);
    }
  };
};
