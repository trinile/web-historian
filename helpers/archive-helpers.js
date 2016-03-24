var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');

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

exports.readListOfUrls = function(callback) { //urls is an array
  // fs.readFile
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (err) {
      callback(err);
    } else {
      callback(contents.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  //do this check first when user submits url
  fs.readFile(exports.paths.list, 'utf8', function(err, contents) {
    if (err) {
      callback(err);
    } else {
      var urlArray = contents.split('\n');
      callback(urlArray.indexOf(url) !== -1);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, 'utf8', function(err) {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
  //var fsa = Promise.promisify(fs.appendFile);
};

exports.isUrlArchived = function(url, callback) {
  // check
  fs.readFile(exports.paths.archivedSites, 'utf8', function(err, contents) {
    if (err) {
      callback(err);
    } else {
      var urlArray = contents.split('\n');
      callback(urlArray.indexOf(url) !== -1);
    }
  });
};

exports.downloadUrls = function(url, fileDest, cb) {
  var file = fs.createWriteStream(fileDest);

  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) { cb(err.message); }
  });
};
