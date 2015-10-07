var http = require('http');

var fs = require('fs');
var url = require('url');

var path = require("path");
var mime = require("mime");

function start() {

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  // response.writeHead(200, {"Content-type" : "text/plain"});
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "www/index.html";
  } else {
    filePath = "www" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});



function onRequest(request, response) {
    console.log("Request received from maim app."); //наш callback
    
       // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
   
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");


      var filePath = false;

      if (request.url == '/') {
        filePath = "www/index.html";
      } else {
        filePath = "www" + request.url;
      }

      var absPath = "./" + filePath;
      serverWorking(response, absPath);

  }

  http.createServer(onRequest).listen(8888);
  
  // Console will print the message
  console.log('Server running at http://127.0.0.1:8888/');

}

exports.start = start;
