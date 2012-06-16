var http = require('http');
http.createServer(function (req, res) {
	if (req.url == '/client') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("\
<!doctype html>\
<script>\
var es = new EventSource('http://localhost/');\
es.onmessage = function(evt) {\
	console.log(evt.data)\
}\
</script>\
		")
	} else {
		res.writeHead(200, {'Content-Type': 'text/event-stream'});
		setInterval(function() {
			res.write('data: ' + Date.now() + '\n\n')
		}, 1000)
	}
	//res.end('data: Hello World\n\n');
}).listen(80, '127.0.0.1');