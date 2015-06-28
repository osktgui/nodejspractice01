var http = require('http');


http.createServer(function(req, res){

	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

	switch(path){
		case '':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<h3>Path: Home</h3>');		
			break;
		case '/about':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<h3>Path: about</h3>');
			break;
		default:
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h3>No found</h3>');
			break;
	}
}).listen(3000);

console.log('Server started on http://localhost:3000; Press Ctrl - C on terminate;');