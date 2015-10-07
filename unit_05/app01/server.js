
var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received from maim app."); //наш callback
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  
  // Console will print the message
  console.log('Server running at http://127.0.0.1:8888/');

}

exports.start = start;