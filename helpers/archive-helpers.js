var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');
var http = require('http');
var request = require('request');
var url = require('url');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() { //urls is an array
  return new Promise(function(resolve, reject) {
    fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
      if (err) {
        reject( err );
      } else {
        resolve(contents.split('\n'));
      }
    });  
  });
};

exports.isUrlInList = function(url, callback) {
//do this check first when user submits url
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (err) {
      (callback(err));
    } else {
      var urlArray = contents.split('\n');
      (callback( urlArray.indexOf(url) !== -1));
    }
  });
};


exports.isUrlInList = Promise.promisify(exports.isUrlInList);

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', 'utf8', function(err) {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};
exports.addUrlToList = Promise.promisify(exports.addUrlToList);

exports.isUrlArchived = function(url, callback) {
  // console.log('isUrlArchived is called')
  console.log('path = ', exports.paths.archivedSites)
  fs.readdir(exports.paths.archivedSites,  function(err, contents) {
    console.log('callback is being called')
    console.log(err, contents)
    if (err) {
      callback(err);
    } else {
      // var urlArray = contents.split('\n');
      callback(contents.indexOf(url) !== -1);
    }
  });
};
// exports.isUrlArchived = Promise.promisify(exports.isUrlArchived);

exports.downloadUrls = function(urlArray) {
  return new Promise(function(resolve, reject) {
    urlArray = urlArray.filter( function(a) { return a.length; } );
    _.each(urlArray, function(url) {
      if (url.indexOf('http://') === -1) {
        urlReal = 'http://' + url;
        console.log(url, urlReal);
      }
      var stream = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
      request(urlReal).pipe(stream);
      stream.on('finish', function() { resolve() } );
      stream.on('error', function(err) {
        reject(err);
      });
    });
  });
};

exports.checkValidURL = function(urlGiven) {
  console.log(url.parse(urlGiven).hostname);

  if (urlGiven.indexOf('//') !== -1) {
    var hostURL = urlGiven.substring(urlGiven.indexOf('//' + 3));
    console.log(hostURL);
  } else {
    var hostURL = urlGiven;
  }
  var options = { method: 'HEAD', host: hostURL, path: '/'};
  var request = http.request(options, function(response) {
    console.log(response.statusCode);
    console.log(response.headers.location);
    // console.log();
  });
  // request.end();
};
