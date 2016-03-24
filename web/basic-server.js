var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var url = require('url');
var httpHelper = require('./http-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
// var server = http.createServer(handler.handleRequest);

var router = {
  '/': handler.handleRequest,
  '/styles.css': handler.handleRequest
};

var server = http.createServer( function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  var route = router[url.parse(req.url).pathname];
  if (route) {
    route(req, res);
  } else {
    httpHelper.sendResponse(res, '', 404);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

