var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlhelp = require('url');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
var path = require('path');
// require more modules/folders here!
var filePages = {  
  '/styles.css': 'text/css',
  '/app.js': 'javascript/text'
};

exports.handleRequest = function (req, res) {
  // user is requesting root index
  console.log( req.method, req.url);

  var filePath = req.url; 
  var ext = '.html';
  var contentType = 'text/html';
  //if file path is simply / , then the filepath is public/index.html
  if (filePath === '/') {
    filePath = 'index.html';
    //extension is html
  } else if (filePages.hasOwnProperty(filePath)) {
  //otherwise, filepath is   public/ + filepath
    filePath = filePath;
    //test extension name at set the appropriate header
    ext = path.extname('filePath');
  }

  if (req.method === 'GET') {
    var indexHTML = fs.readFile(__dirname + '/public/' + filePath, function(err, contents) {
      if (err) {
        console.log(err);
      } else {
        console.log('filepath ', filePath);
        httpHelpers.sendResponse(res, contents, filePages[filePath] || 'text/html');
      }
    });
  } else if (req.method === 'POST') {
    httpHelpers.collectData(req, function(data) {

      var url = data.substring(data.indexOf('=') + 1);
      console.log(urlhelp.parse(url));
      url = urlhelp.parse(url).hostname; //www.google.com 

      // archive.UrlInList(url, function(is) {
      //   if (is) { return url; }
      // })
      //   .archive.isUrlAchived(

      //     )


      //encoding issues, must replace with ://
      // var regex = /%3A%2F%2F/;
      // url = url.replace(regex, '://');
      //check url
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
      console.log(data); //'url=userInputhere'
      // console.log(typeof data);
      console.log('url name: ', url);
    });      
  }

  // res.end(archive.paths.list);
};


//upon form submission of website
  //validate it is a correct url 
    //ask a header from that website.
  //if correct url
    //save url to site list
    //download the url
