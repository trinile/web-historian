var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // user is requesting root index
  console.log( req.method, req.url);
  if (req.method === 'GET') {
    var indexHTML = fs.readFile(__dirname + '/public/index.html', function(err, contents) {
      if (err) {
        console.log(err);
      } else {
        httpHelpers.sendResponse(res, contents);
      }
    });
  } else if (req.method === 'POST') {
    httpHelpers.collectData(req, function(data) {
      var url = data.substring(data.indexOf('=') + 1);
      console.log(data); //'url=userInputhere'
      // console.log(typeof data);
      console.log('url name: ', url);
    });      
  }

  // res.end(archive.paths.list);
};


