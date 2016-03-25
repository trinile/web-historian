var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var url = require('url');
var httpHelper = require('./http-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8000;
var ip = '127.0.0.1';
// var server = http.createServer(handler.handleRequest);

// var router = {
//   '/': handler.handleRequest,
//   '/styles.css': handler.handleRequest
// };

/*
'/www.xyz.com'
test if we have www.xyz.com donwloaded or pending

*/

var server = http.createServer( handler.handleRequest);
// function(req, res) {

//   // var route = url.parse(req.url).pathname;
//   // console.log(route);

//   // if (router[route]) { //user is requesting somethign from our own site '/websitename'
//   //   router[route](req, res);
//   // } else if ( route ) {

//   // } else {  //error
//     // httpHelper.sendResponse(res, '', 404);
//   // }
// });

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

