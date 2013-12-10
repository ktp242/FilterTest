var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);

function requestHandler(req, res) {
	// Read index.html
	fs.readFile(__dirname + '/filterTest.html', 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
			console.log("server connected")
		}
		);
}

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		var myTimerValue = 0;

		function myTimer(){
			setInterval(myTimerValue ++, 1000);
			console.log(myTimerValue);
			io.sockets.emit('myTimer', myTimerValue);
		}

		myTimer();

		 // Once the client has left
		 socket.on ('disconnect', function() {
		 	console.log("One client has left");
		 });

		}
		);