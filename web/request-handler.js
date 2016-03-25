var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlhelp = require('url');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var path = require('path');
var request = require('request');
// require more modules/folders here!
var filePages = {  
  '/styles.css': 'text/css',
  '/app.js': 'javascript/text',
  '/loading.html': 'text/html',
  'index.html': 'text/html'
};


exports.handleRequest = function (req, res) {
  // user is requesting root index
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var filePath = req.url; 
  //if file path is simply / , then the filepath is public/index.html
  if (filePath === '/') {
    filePath = 'index.html';
  }
  // else if (filePages.hasOwnProperty(filePath)) {
  // //otherwise, filepath is   public/ + filepath
  //   filePath = filePath;
  //   //test extension name at set the appropriate header
  //   ext = path.extname('filePath');

  if (req.method === 'GET' ) {
    if (!filePages[filePath]) {
      console.log('caaling assestsssss');
      httpHelpers.serveAssets(res, filePath, function(err, res) {
      });

    } else if (filePages.hasOwnProperty(filePath)) {
      ///if asking for a homepage asset...
      console.log(__dirname);
      fs.readFile(__dirname + '/public/' + filePath, function(err, contents) {
        if (err) {
          console.log(err);
        } else {
          console.log('filepath ', filePath);
          httpHelpers.sendResponse(res, contents, filePages[filePath] || 'text/html');
        }
      }); 
    }

  } else if (req.method === 'POST') {
    httpHelpers.collectData(req, function(data) {
      var url = data.substring(data.indexOf('=') + 1); 
      // url = urlhelp.parse(url).hostname; //www.google.com 
      //validate the url


      //check if url is in list
      archive.isUrlInList(url, function(is) {
        if (!is) {
          archive.addUrlToList(url);
        }
      });

      res.writeHead(302, {'Location': '/' + url });
      res.end();
      //check if url is in 
      //perform validation and return data...
      // var loc = __dirnam + '/public/'
      // archive.checkValidURL(url);
      //check if url is valid
      // readlist
      //   .on isUrlInList
      //     .on isUrlArchived??
      //     .on redirect...
      //   .catch addToList (to download)
      //     .on redict to loading page
      // .catch - sorry, something's wrong, can't read our own list
      //run a function that will redirect page
      //add page if it doesnt exit
      //load loading html if it is not yet downloaded
      // console.log(typeof data);
    });
    
      // console.log(urlhelp.parse(url));
    // res.end(); 
  }

  // res.end(archive.paths.list);
};


//upon form submission of website
  //validate it is a correct url 
    //ask a header from that website.
  //if correct url
    //save url to site list
    //download the url
