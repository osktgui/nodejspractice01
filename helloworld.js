var http = require('http');


http.createServer(function(req, res){
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Esto es un texto plano');

}).listen(3000);

console.log('Server started on http://localhost:3000; Press Ctrl - C on terminate;');