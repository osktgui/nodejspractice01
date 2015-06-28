var http = require('http'),
		fs = require('fs');

function serverStaticFile(res, path, contentType, responseCode){ //open file, read file, send file
	if(!responseCode){
		responseCode = 200;
	}

	fs.readFile(__dirname + path, function(err, data){ //dirname --> Resuelve el directorio donde se esta ejecutando el script
		if(err){
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('500 - Internal Error');
		}else{
			res.writeHead(responseCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}


http.createServer(function(req, res){

	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

	switch(path){
		case '':
			serverStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serverStaticFile(res, '/public/about.html', 'text/html');
			break;
		case '/img/poder.jpg':
			serverStaticFile(res, '/public/img/poder.jpg', 'image/jpeg');
			break;
		default:
			serverStaticFile(res, '/public/notfound.html', 'text/html');
			break;
	}
}).listen(3000);

console.log('Server started on http://localhost:3000; Press Ctrl - C on terminate;');